import { useRouter } from "next/router";


const LinkComponent = ({href, children}) => {
    const router = useRouter();

    const navigateTo = () => {

        let pathname = window.location.pathname.split("/")

        pathname.shift()
        pathname.shift()

        let newPathname = `${href}/${pathname.join("/")}`

        window.location.href = newPathname
    }

    return (
        <a onClick={() => navigateTo()} className={`/${router.query.language}` === href ? "active-link" : ""}>{children}</a>
    )
}

export default LinkComponent