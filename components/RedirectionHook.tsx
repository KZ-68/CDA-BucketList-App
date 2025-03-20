import { useRouter } from "next/navigation";

interface RedirectionHookProps {
    url : string;
}

const RedirectionHook = ( { url }: RedirectionHookProps) => {
    const router = useRouter()

    setTimeout(() => {
        router.push(url);
    }, 3000)
    return true;
}

export default RedirectionHook