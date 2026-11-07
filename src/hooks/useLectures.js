import { useEffect,useState } from "react";

import { getLectures } from "../services/database";

export default function useLectures(courseId, momentId){

    const [lectures,setLectures]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        async function load(){

            setLoading(true);

            const data=await getLectures(courseId, momentId);

            setLectures(data);

            setLoading(false);

        }

        if(courseId){

            load();

        } else {

            setLectures([]);

            setLoading(false);

        }

    },[courseId, momentId]);

    return{

        lectures,

        loading

    };

}