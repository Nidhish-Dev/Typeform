'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

interface AuthFormProps {
    isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = isLogin ? 'https://typeform-backend.vercel.app/auth/login' : 'https://typeform-backend.vercel.app/auth/register';
        const body = isLogin ? { username, password } : { name, username, password };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            // Log response details
            console.log('Response status:', res.status);
            console.log('Response body:', await res.clone().json());

            if (res.ok) {
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    router.push('/dashboard');
                } else {
                    alert('Registration successful! Please log in.');
                    router.push('/login');
                }
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.message || 'Invalid credentials or registration failed.'}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
         

            <Card className="w-[350px]">
      <CardHeader>
        {/* <CardTitle>Create project</CardTitle> */}
        <CardDescription>Get better data with conversational forms, surveys, quizzes & more..</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          {!isLogin && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name " />
            </div>
)}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Email" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" />
            </div>
            {!isLogin && (
            <CardDescription>Already have an account? <Link className='underline text-black' href="/login">Login</Link>
      

            </CardDescription>
        )}
    {isLogin && (
                        <CardDescription>
                            Create an account? <Link className='underline text-black' href="/register">Sign up</Link>
                        </CardDescription>
                    )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      
        <Button type="submit">{isLogin ? 'Login' : 'Sign up'}</Button>
      </CardFooter>
    </Card>
        </form>
    );
};

export default AuthForm;
