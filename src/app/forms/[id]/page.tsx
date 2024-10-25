'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
 
interface Form {
    title: string;
    questions: Array<{
        questionText: string;
        questionType: string;
        options?: string[];
    }>;
}

const FillFormPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const [form, setForm] = useState<Form | null>(null);
    const [responses, setResponses] = useState<Record<number, string>>({});
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const fetchParams = async () => {
            const unwrappedParams = await params;
            setId(unwrappedParams.id);
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        const fetchForm = async () => {
            if (!id) return;

            try {
                const res = await axios.get(`https://typeform-backend.vercel.app/forms/${id}`);
                setForm(res.data);
            } catch (error) {
                console.error('Failed to fetch form:', error);
            }
        };

        fetchForm();
    }, [id]);

    const handleResponseChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newResponses = { ...responses };
        newResponses[index] = e.target.value;
        setResponses(newResponses);
        console.log(`Response at index ${index} updated:`, e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const responsesArray = Object.values(responses);
        console.log('Responses Array before Submission:', responsesArray);
        console.log(`Submitting responses for form ID: ${id}`);

        try {
            const response = await axios.post(`https://typeform-backend.vercel.app/forms/${id}/responses`, {
                answers: responsesArray,
            });

            console.log('Response submitted:', response.data);
            router.push('/thank-you');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    const copyToClipboard = () => {
        if (!id) return;
        navigator.clipboard.writeText(`${window.location.origin}/forms/${id}`)
            .then(() => alert('URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    if (!form) return <div>Loading...</div>;

    return (
        <>

<div className='flex justify-between mx-10 mt-4'>
      <img className='logo' src="/Typeform.svg" alt="" />
      
    </div>
        <div>
            <p className='mx-10 mt-4 text-xl font-light'>{form.title}</p>
            
           
            {/* <button onClick={copyToClipboard} className="mb-4 text-blue-500">
                Copy Form URL
            </button> */}
        </div>
<div className="flex justify-center items-center">
        <Card className="w-[650px] ">
      <CardHeader>
        <CardTitle>Fill Form</CardTitle>
       
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            
            {form.questions.map((question, index) => (
                    <div key={index}>
                        <Label>{question.questionText}</Label>
                        {question.questionType === 'text' ? (
                            <Input 
                                type="text" 
                                onChange={(e) => handleResponseChange(index, e)} 
                                required 
                            />
                        ) : (
                            <select 
                                onChange={(e) => handleResponseChange(index, e)} 
                                required
                            >
                                <option value="" disabled>Select an option</option>
                                {question.options?.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
          </div>
          <CardFooter className="flex justify-between mt-5">
        <Button onClick={copyToClipboard} variant="outline">Copy form url</Button>
        <Button type="submit" >Submit</Button>
      </CardFooter>
        </form>
      </CardContent>
      
    </Card>
    </div>
        </>
    );
};

export default FillFormPage;
