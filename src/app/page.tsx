"use client";

import Button from '@/app/components/elements/button';
import Input from '@/app/components/elements/input';
import Select from '@/app/components/elements/select';

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen p-32'>
      <Select placeholder='Select a fruit' options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]} value='apple' onChange={(value) => console.log(value)} />
    </div>
  );
}
