import { useNavigate } from "react-router-dom";
import { MemberForm } from "./memberForm";

import { useState , useEffect} from "react";
import requester from "../axios";

export function Members() {
    
    useEffect(() => {
    const getMembers = async () => {
        try {
            const response = await requester.get('/members');
            setMembers(response.data);
        } catch (error) {
            console.error('Erro ao buscar os membros:', error);
        }
    };

    getMembers();
    }, []);

    const deleteMember = async (id) => {
        try {
            await requester.delete(`/members/${id}`);
            setMembers(members.filter((member) => member.id !== id));
        } catch (error) {
            console.error('Erro ao deletar membro:', error);
        }
    };

    const navigate = useNavigate();

    const [members, setMembers] = useState([]);

    const updateMembers = (data) => setMembers([...members, data]) ;

    return(
        <div className="flex flex-col gap-4 text-orange-500">
            <h1>Membros</h1>
            <ul>
                {members.map((member) => (
                    <li key={member.id} className="cursor-pointer flex gap-4 items-center">
                        {member.name}
            <button onClick={() => navigate(member.id)}>Editar</button>
             <button onClick={
                        
                            () => deleteMember(member.id)}>Excluir</button> 
                    </li>
                ))}
            </ul>
            <MemberForm updateMembers={updateMembers} />
        </div>
    );
}