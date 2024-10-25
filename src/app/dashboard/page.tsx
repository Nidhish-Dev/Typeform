'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
    const [forms, setForms] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchForms = async () => {
            const res = await fetch('https://typeform-backend.vercel.app/forms', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();
            setForms(data);
        };

        fetchForms();
    }, []);

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(() => alert('URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Redirect to the login page
        router.push('/login');
    };

    return (
<>

<div className='flex justify-between mx-10 mt-4'>
      <img className='logo' src="/Typeform.svg" alt="" />

      <Link href="/register"><Button onClick={handleLogout} >Logout</Button></Link>
      
    </div>

        <div>
            <div className='flex justify-between mt-5'>

           
            <p className='mx-10 mt-4 text-xl font-light'>Your Forms</p>
            <Link href="/create" className="mx-10 mt-4 mb-4 inline-block"><Button >+ Create a new form</Button></Link>
            </div>
            <ul>
                {forms.map((form: any) => (
                    <li  key={form._id} className="flex items-center justify-between ">
                        <Link className='mx-10 mt-4' href={`/forms/${form._id}`}>{form.title}</Link>
                        <Button
                        variant="ghost"
                            onClick={() => copyToClipboard(`${window.location.origin}/forms/${form._id}`)}
                            className="ml-2 mt-4 text-blue-500"
                        >
                            Copy URL
                        </Button>

                        <Link href={`/forms/${form._id}/responses`} className="mx-10 mt-4 text-blue-500">
                         
                         <Button variant="ghost">View Responses</Button>   
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>

    );
};

export default DashboardPage;
