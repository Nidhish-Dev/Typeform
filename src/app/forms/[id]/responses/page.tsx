// src/app/forms/[id]/responses/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ResponsesPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { id } = params; 
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            const res = await fetch(`https://typeform-backend.vercel.app/forms/${id}/responses`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();
            setResponses(data);
        };

        fetchResponses();
    }, [id]);

    if (!responses.length) return <div>No responses yet.</div>;

    return (

        <>
         <div className='flex justify-between mx-10 mt-4'>
      <img className='logo' src="/Typeform.svg" alt="" />
      
    </div>
      

        <div>
            <p  className='mx-10 mt-4 text-xl font-bold'>Responses for Form ID: {id}</p>
            <ul className='mx-10 mt-4 text-lg '>
                {responses.map((response: any, index) => (
                    <li key={index} >
                        <p>Submitted at: {new Date(response.submittedAt).toLocaleString()}</p>
                        <ul className='bg-black text-white px-7 py-3 rounded '>
                            {response.answers.map((answer: string, answerIndex: number) => (
                                <li key={answerIndex}>{answer}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default ResponsesPage;
