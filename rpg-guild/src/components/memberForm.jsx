import { useParams } from "react-router-dom";

export function MemberForm(props) {
    const { memberId } = useParams();

    return(
        <form className="flex flex-col gap-4" p-5 text-orange-500>
            Membro{ memberId }
        </form>
    )
}