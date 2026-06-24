import { useParams } from "react-router-dom";
import { useState } from "react";

import requester from "../axios";



export function GuildForm(props) {
    const { guildId } = useParams();
    const [guild, setGuild] = useState();
const addGuild = async (guild) => {
    const { name } = guild;

    const create = { name };

    try {
        const response = await requester.post('/guilds', create);
        props.updateGuilds?.(response.data);
    } catch (error) {
        console.error("Erro ao adicionar guilda:", error);
    }
};

const onSubmit = (e) => {
    e.preventDefault();
    addGuild(guild);
};
    return(
        <form onSubmit={onSubmit} className="flex flex-col gap-4" p-5 text-orange-500>
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

    <button type="submit" className="-fit">Confirmar</button>

        </form>
    )
}