export default (slug, index) => {
    let split = slug.split('__')

    if(index === 1) {
      return split[1]
    } else if (index === 2) {
      return split[2]
    }
}