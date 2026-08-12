import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";

import requester from "../axios";

export function GuildForm(props) {
  const { guildId } = useParams();
    const [guild, setGuild] = useState();
    const addGuild = async (guild) => {
    const { name } = guild;

    const create = { name };
useEffect(() => {
    const getGuild = async () => {
        try {
            const response = await requester.get(`/guilds/${guildId}`);
            setGuild(response.data);
        } catch (error) {
            console.error('Erro ao buscar a guilda:', error);
        }
    };

    if (guildId) getGuild();
}, [guildId]);

  

    try {
        const response = await requester.post('/guilds', create);
        props.updateGuilds?.(response.data);
    } catch (error) {
        console.error("Erro ao adicionar guilda:", error);
    }
};

const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(guild);
};

    const editGuild = async (guild) => {
        const { id , name } = guild;

        const updated = { name, };

        try {
            const response = await requester.put(`/guilds/${guildId}`, updated);
            props.updateGuilds?.(response.data);
        } catch (error) {
            console.error("Erro ao editar guilda:", guildId);
        }
    };

    const handleSubmit = guildId ? editGuild : addGuild;
    return(
        <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-500">
            <div className="flex flex-col gap-1">
            <label>Guilda</label>
            <input
                name="name"
                type="text"
                defaultValue={guild?.name}
                onChange={(e) =>
                     setGuild((prev) => ({ ...prev, name: e.target.value 

                                }
                            )
                        )
                    }
            />
            </div>

    <button type="submit" className="w-fit">Confirmar</button>

        </form>
    )
}