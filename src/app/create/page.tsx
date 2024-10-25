'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

const CreateFormPage = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', questionType: 'text', options: [''] }]);
    const router = useRouter();

    const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = e.target.value;
        setQuestions(newQuestions);
    };

    const handleQuestionTypeChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuestions = [...questions];
        newQuestions[index].questionType = e.target.value;
        // Reset options when the question type changes
        if (e.target.value === 'multiple-choice') {
            newQuestions[index].options = ['']; // Reset to one empty option
        }
        setQuestions(newQuestions);
    };

    const handleOptionsChange = (index: number, optionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', questionType: 'text', options: [''] }]);
    };

    const addOption = (index: number) => {
        const newQuestions = [...questions];
        newQuestions[index].options.push(''); // Add a new empty option
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const res = await fetch('https://typeform-backend.vercel.app/forms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, questions }),
            });
    
            if (res.ok) {
                router.push('/dashboard');
            } else {
                const errorResponse = await res.json();
                alert(`Failed to create form: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error creating form:', error);
            alert('An error occurred while creating the form');
        }
    };
    
    return (
        <div>
        <div className='flex justify-between mx-10 mt-4'>
      <img className='logo' src="/Typeform.svg" alt="" />
      
    </div>
        <div className="flex justify-center items-center">
            <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Form</CardTitle>
       
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Form Title">Form Title</Label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title of your Form" />
            </div>

            {questions.map((question, index) => (
                <div key={index}>
                    <label>Question {index + 1}</label>
                    <Input
                        type="text"
                        value={question.questionText}
                        onChange={(e) => handleQuestionChange(index, e)}
                        required
                    />
                    <label>Question Type</label>
                    <select className='mt-4' value={question.questionType} onChange={(e) => handleQuestionTypeChange(index, e)}>
                        <option value="text">Text</option>
                        <option value="multiple-choice">Multiple Choice</option>
                    </select>
                    {question.questionType === 'multiple-choice' && (
                        <>
                            <div>
                                <label>Options</label>
                                {question.options.map((option, optionIndex) => (
                                    <Input
                                    className='mt-3 mb-3'
                                        key={optionIndex}
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionsChange(index, optionIndex, e)}
                                        required
                                    />
                                ))}
                                <Button type="button" onClick={() => addOption(index)}>
                                    Add Option
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            ))}

<Button type="button" onClick={addQuestion}>Add Question</Button>
<Button type="submit">Create Form</Button>
           
          </div>
        </form>
      </CardContent>
     
    </Card>
    </div>
        </div>
    );
};

export default CreateFormPage;
