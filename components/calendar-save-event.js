<div class="home-calendar__event">
<Link href={item.slug}>
<div class="home-calendar__information">
    <div>
    {/* {item.index === undefined && <DateComponent data={item} />} */}
    {/* {(item.occurences) && <DateComponent data={item.occurences[item.index]} />} */}
    </div>
    <div>
    {/* <h6><Body content={item.location} /></h6> */}
    </div>
</div>
<div class="home-calendar__title h2">
    <Body content={item.title}/>
</div>
<div class="home-calendar__image"><Image data={item.vignette} /></div>
</Link>
</div>