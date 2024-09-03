import FormButton from "@/components/form-components/form-button";
import { Form } from "@/components/ui/form";
import http from "@/lib/http";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginValidation } from "./resource/type";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/form-components/input";
import Password from "@/components/form-components/password";

export default function Login() {
  const method = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginValidation)
  })
  const { handleSubmit } = method;
  const navigate = useNavigate()


  const submit: SubmitHandler<LoginFormValues> = async (payload) => {
    await http.get('/sanctum/csrf-cookie')
    const result = await http.post('/login', payload)

    if (result.status === 'success') navigate("/dashboard")
    else toast(result)
  };

  return (
    <div className="sm:max-w-sm bg-white dark:bg-default shadow-md overflow-hidden sm:rounded-lg w-full mt-6 px-6 py-4">
      <h4 className="text-xl font-semibold mb-5 text-center dark:text-slate-300">Staff Login</h4>

      <Form {...method}>
        <form
          className="space-y-8 flex flex-col"
          onSubmit={handleSubmit(submit)}
        >
          <Input
            name="email"
            className="bg-input border-input"
            placeholder="Email address"
          />
          <Password
            name="password"
            className="bg-input border-input"
            placeholder="Enter your password"
          />

          <FormButton className="text-white w-4/5 mx-auto">Login</FormButton>
        </form>
      </Form>
    </div>
  );
}
