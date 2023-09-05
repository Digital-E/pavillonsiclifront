export default (slug) => {
    let matches = [...slug.matchAll("__")]

    if(matches.length === 0) {
        return slug
    } else if (matches.length === 1) {
        return `${slug.split("__")[0]}/${slug.split("__")[1]}`
    } else if (matches.length === 2) {
        return `${slug.split("__")[0]}/${slug.split("__")[1]}/${slug.split("__")[2]}`
    } else {
        return "/"
    }
}