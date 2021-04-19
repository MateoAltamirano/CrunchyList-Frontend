import { Box,Input ,Button, Flex,FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { userContext } from "../providers/UserContext";
import { UserActionType } from "../reducers/UserReducer";
import '../styles/login.css'
import logo from '../assets/img/LogoWhiteMAL.png'
import { Formik, Field, Form, FieldProps } from 'formik'


const LogIn = () =>{
  function validate(values:any) {
    const errors:any={};
    if(!values.email){
      errors.email="El email es requerido";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      errors.email = 'Debe ingresar un email válido';
    }
    if(!values.user){
      errors.user='Debe ingresar el usuario';
    }
    return errors;
  }
  return  (
    <Box className="bg">
      <Box backgroundColor={"primary.main"}  className="loginCard">
        <img src={logo}></img>
        {/* <Formik
          initialValues={{user:'',password:''}}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
            }, 1000)
          }}
        >
        {(props)=>(
          <Form>
            <Field name="user" validate={validate}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.user && form.touched.user}>
                  <FormLabel htmlFor="user">Usuario</FormLabel>
                  <Input {...field} id="user" placeholder="Usuario" />
                  <FormErrorMessage>{form.errors.user}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

          </Form>

        )}
          
        </Formik> */}
        <FormControl>
              <Input  placeholder="Usuario" />
              <Input type={"password"} placeholder="Contraseña"/>
          </FormControl>
      </Box>
    </Box>
  )
}




export default LogIn