import{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import requester from "../axios";

export function MemberForm(props) {
    const { memberId } = useParams();

    const [member, setMember] = useState();
    const [guilds, setGuilds] = useState([]);

 useEffect(() => {
    const getMember = async () => {
        try {
            const response = await requester.get(`/members/${memberId}`);
            setMember(response.data);
        } catch (error) {
            console.error("Erro ao buscar membro:", error);
        }
    };
    if (memberId) getMember();
}, [memberId]); 

const addMember = async ({ name, guildId }) => {
    const created = { 
        name, 
        memberId, 
    };

    try {
        const response = await requester.post('/members', created);
        setMember(response?.data);
        props.updateMembers?.(response?.data);
    } catch (error) {
        console.error("Erro ao adicionar membro:", error);
    }
};

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(member);
    };

       const editMember = async (member) => {
        const { id , name, memberIdfake } = member;

        const updated = { name,};

        try {
            const response = await requester.put(`/members/${memberId}`, updated);
            props.updateMembers?.(response.data);
        } catch (error) {
            console.error("Erro ao editar membro:", memberId);
        }
    };
     const handleSubmit = memberId ? editMember : addMember;
    return(
        <form onSubmit={onSubmit} className="flex flex-col gap-4  text-orange-500">
            <div className="flex flex-col gap-1">
                <label>Membro</label>
                <input
                    role="input"
                    name="name"
                    type="text"
                    defaultValue={member?.name}
                    onChange={(e) =>
                        setMember((prev) => ({ ...prev, name: e.target.value }))
                    }
              />
            </div>

            <div className="flex flex-col gap-1">
                <label>Guilda</label>
                <select
                role="select"
                value={member?.guildId ?? 0}
                name="guild"
                onChange={(e) =>
                    setMember((prev) => ({ ...prev, guildId: e.target.value }))
                }
                >
                    <option value="" />
                    {guilds.map((guild) => (
                        <option key={guild.id} value={guild.id}>
                            {guild.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="w-fit">Confirmar</button>
        </form>

    );
}