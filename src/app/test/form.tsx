"use client";

import { useState } from "react";
import {
  Input,
  Label,
  Checkbox,
  Textarea,
} from "@relume_io/relume-ui";
import { BiEnvelope } from "react-icons/bi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoVideocamOffOutline } from "react-icons/io5";

type Props = {
  heading: string;
  description: string;
};

type FormProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const Form = (props: FormProps) => {
  const { heading, description } = {
    ...FormDefaults,
    ...props,
  } as Props;

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [doctorEmailInput, setDoctorEmailInput] = useState("");

  const [messageInput, setMessageInput] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      firstNameInput,
      lastNameInput,
      emailInput,
      doctorEmailInput,
      messageInput,
      acceptTerms,
    });
  };

  return (
    <section className="px-[5%] py-14 md:py-18 lg:py-22">
      <div className="container grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:grid-flow-col lg:gap-x-20 lg:gap-y-16">
        <div>
          <div className="mb-6 md:mb-8">
            <h2 className="mb-5 text-6xl font-bold md:mb-6 md:text-8xl lg:text-9xl font-primary">{heading}</h2>
            <p className="md:text-md font-secondary">{description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 py-2 font-secondary">
            <div className="flex items-center gap-4">
              <MdOutlinePrivacyTip className="size-6 flex-none" />
              <p>Your privacy is fully protected with secure, encrypted data storage.</p>
            </div>
            <div className="flex items-center gap-4">
              <BiEnvelope className="size-6 flex-none" />
              <p>Your report will be securely sent to you and your doctor via email.</p>
            </div>
            <div className="flex items-center gap-4">
              <IoVideocamOffOutline className="size-6 flex-none" />
              <p>Your video is deleted from our servers immediately after processing.</p>
            </div>
          </div>
        </div>

        <form className="grid grid-cols-1 grid-rows-[auto_auto] gap-6 font-secondary" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid w-full items-center">
              <Label htmlFor="firstName" className="mb-2">
                First name
              </Label>
              <Input
                type="text"
                id="firstName"
                value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
                placeholder=" "
                className='input'
              />
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="lastName" className="mb-2">
                Last name
              </Label>
              <Input
                type="text"
                id="lastName"
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                placeholder=" "
                className='input'
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder=" "
                className='input'
              />
            </div>

            <div className="grid w-full items-center">
              <Label htmlFor="email" className="mb-2">
                Doctor Email (optional)
              </Label>
              <Input
                type="text"
                id="phone"
                value={doctorEmailInput}
                onChange={(e) => setDoctorEmailInput(e.target.value)}
                placeholder=" "
                className='input'
              />
            </div>
          </div>

          <div className="grid w-full items-center">
            <Label htmlFor="message" className="mb-2">
              Anything we should know?
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message..."
              className="min-h-[11.25rem] overflow-auto input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 text-sm md:mb-4">
            <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
            <Label htmlFor="terms" className="cursor-pointer">
              I accept the{" "}
              <a
                className="text-link-primary hover-underline"
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Terms and Conditions</strong>
              </a>
            </Label>
          </div>
          <div className='flex gap-4'>
            <button className='btn font-primary'>
              Continue
            </button>
            <button className='btn btn-secondary font-primary'>
              Return Home
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const FormDefaults: FormProps = {
  heading: "Let's Get Started",
  description: "Please fill out the form to start your test. This process will help us gather the necessary data to provide you with a comprehensive analysis. Once finished, you'll receive actionable insights to help guide your next steps toward better eye health.",
};

export default Form;
