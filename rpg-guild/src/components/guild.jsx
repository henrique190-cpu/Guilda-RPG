import { useNavigate } from "react-router-dom";
import { GuildForm } from "./guildForm";
import { useState , useEffect} from "react";
import requester from "../axios";

export function Guilds() {
     const navigate = useNavigate();

    const [guilds, setGuilds] = useState([]);
    
    useEffect(() => {
        const getGuilds = async () => {
            try {
                const response = await requester.get('/guilds');
                setGuilds(response.data);
            } catch (error) {
                console.error('Erro ao buscar as guildas:', error);
            }
        };

        getGuilds();
    }, []);

    const deleteGuild = async (id) => {
        console.error('Erro ao deletar guilda:', id);
        try {
            await requester.delete(`/guilds/${id}`);
            setGuilds(guilds.filter((guild) => guild.id !== id));
        } catch (error) {
            console.error('Erro ao deletar guilda:', error);
        }
    };

   

    const updateGuilds = (data) => setGuilds([...guilds, data]) ;
    return(
        <div className="flex flex-col gap-4  text-orange-500">
            <h1>Guildas</h1>
            <ul>
                {guilds.map((guild) => (
                    
                    <li key={guild.id} className="cursor-pointer flex gap-4 items-center">
                        {guild.name}
                        <button onClick={() => navigate(guild.id)}>Editar</button>  
                        <button onClick={
                        
                            () => deleteGuild(guild.id)}>Excluir</button> 
                              

                    </li>
                        )
                    )
                }
            </ul>
            <GuildForm updateGuilds={updateGuilds} />
        </div>
    );
}