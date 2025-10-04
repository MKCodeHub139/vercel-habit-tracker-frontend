    import { useQuery } from "@apollo/client/react";
    import {GetUser } from '../../../graphql/queries';
    import { useState } from "react";
    function useGetUser(){

        const {data,loading,error} =useQuery(GetUser) 
        return {user:data ?data:null,loading,error}
    }
    export default useGetUser