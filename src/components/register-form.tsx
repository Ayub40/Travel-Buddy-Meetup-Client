"use client";

import { registerUser } from "@/service/auth/registerUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const RegisterForm = () => {
    // server action logic
    const [state, formAction, isPending] = useActionState(registerUser, null);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
        if (state?.success) {
            toast.success("Account created successfully!");
        }
    }, [state]);

    return (
        <form action={formAction} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
            
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input id="name" name="name" type="text" placeholder="John Doe" required />
                        <InputFieldError field="name" state={state} />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" name="password" type="password" placeholder="******" required />
                        <InputFieldError field="password" state={state} />
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="******" required />
                        <InputFieldError field="confirmPassword" state={state} />
                    </Field>

                    <hr className="md:col-span-2 my-2" />

                    {/* Age (Backend expects Number) */}
                    <Field>
                        <FieldLabel htmlFor="age">Age</FieldLabel>
                        <Input id="age" name="age" type="number" placeholder="25" />
                        <InputFieldError field="age" state={state} />
                    </Field>

                    {/* Gender (Enum: MALE, FEMALE, OTHER) */}
                    <Field>
                        <FieldLabel htmlFor="gender">Gender</FieldLabel>
                        <select 
                            id="gender" 
                            name="gender" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                        <InputFieldError field="gender" state={state} />
                    </Field>

                    {/* Country */}
                    <Field>
                        <FieldLabel htmlFor="country">Country</FieldLabel>
                        <Input id="country" name="country" type="text" placeholder="Bangladesh" />
                        <InputFieldError field="country" state={state} />
                    </Field>

                    {/* City / Location */}
                    <Field>
                        <FieldLabel htmlFor="location">City/Location</FieldLabel>
                        <Input id="location" name="location" type="text" placeholder="Dhaka" />
                        <InputFieldError field="location" state={state} />
                    </Field>

                    {/* Bio (Full Width) */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="bio">Short Bio</FieldLabel>
                        <textarea 
                            id="bio" 
                            name="bio" 
                            rows={3}
                            placeholder="Tell us about your travel interests..."
                            className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        <InputFieldError field="bio" state={state} />
                    </Field>

                    {/* Profile Image */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="file">Profile Picture</FieldLabel>
                        <Input id="file" name="file" type="file" accept="image/*" className="cursor-pointer" />
                        <InputFieldError field="file" state={state} />
                    </Field>
                </div>

                <div className="mt-8 space-y-4">
                    <Button type="submit" className="w-full py-6 text-lg" disabled={isPending}>
                        {isPending ? "Creating Account..." : "Create Account"}
                    </Button>

                    <FieldDescription className="text-center text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 font-semibold hover:underline">
                            Sign in
                        </a>
                    </FieldDescription>
                </div>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;











// "use client";

// import { registerUser } from "@/service/auth/registerUser";
// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";
// import { Button } from "./ui/button";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
// import { Input } from "./ui/input";

// const RegisterForm = () => {
//     // state ta toast show korar jonno, error show korar jonno use korte hoy
//     const [state, formAction, isPending] = useActionState(registerUser, null);

//     useEffect(() => {
//         if (state && !state.success && state.message) {
//             toast.error(state.message);
//         }
//     }, [state]);


//     return (
//         <form action={formAction}>
//             <FieldGroup>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Name */}
//                     <Field>
//                         <FieldLabel htmlFor="name">Full Name</FieldLabel>
//                         <Input id="name" name="name" type="text" placeholder="John Doe" />
//                         <InputFieldError field="name" state={state} />
//                     </Field>
//                     {/* Address */}
//                     <Field>
//                         <FieldLabel htmlFor="address">Address (Optional)</FieldLabel>
//                         <Input
//                             id="address"
//                             name="address"
//                             type="text"
//                             placeholder="123 Main St"
//                         />
//                         {/* "name" er sathe "field" er name ta milte hobe */}
//                         <InputFieldError field="address" state={state} />
//                     </Field>
//                     {/* Email */}
//                     <Field>
//                         <FieldLabel htmlFor="email">Email</FieldLabel>
//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             placeholder="m@example.com"
//                         />
//                         <InputFieldError field="email" state={state} />
//                     </Field>
//                     {/* Password */}
//                     <Field>
//                         <FieldLabel htmlFor="password">Password</FieldLabel>
//                         <Input id="password" name="password" type="password" />

//                         <InputFieldError field="password" state={state} />
//                     </Field>
//                     {/* Confirm Password */}
//                     <Field className="md:col-span-2">
//                         <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
//                         <Input
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type="password"
//                         />

//                         <InputFieldError field="confirmPassword" state={state} />
//                     </Field>
//                 </div>
//                 <FieldGroup className="mt-4">
//                     <Field>
//                         <Button type="submit" disabled={isPending}>
//                             {isPending ? "Creating Account..." : "Create Account"}
//                         </Button>

//                         <FieldDescription className="px-6 text-center">
//                             Already have an account?{" "}
//                             <a href="/login" className="text-blue-600 hover:underline">
//                                 Sign in
//                             </a>
//                         </FieldDescription>
//                     </Field>
//                 </FieldGroup>
//             </FieldGroup>
//         </form>
//     );
// };

// export default RegisterForm;
