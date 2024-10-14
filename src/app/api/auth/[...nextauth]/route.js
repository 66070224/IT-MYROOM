import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials, req) {
            console.log("Incoming credentials:", credentials);
        
            const { username, password } = credentials;
        
            try {
                await connectMongoDB();
                console.log("Connected to MongoDB");
        
                const user = await User.findOne({ username });
        
                if (!user) {
                    return null;
                }
        
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log("Password match:", passwordMatch);
        
                if (!passwordMatch) {
                    return null;
                }
        
                return user;

            } catch (error) {
                return null;
            }
        }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username; 
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username; 
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };