import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { parseISO, format, eachDayOfInterval, startOfMonth, endOfMonth, getDay, isSameDay } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';
import { createPortal } from "react-dom";

import Link from "./link";
import Tile from './home/tiles/tile';
import sanitizeTag from "../lib/sanitizeTag";



let Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: white;
    width: 100%;
    box-shadow: -1px -1px 10px rgba(0, 0, 0, 1);

    .home-calendar__mobile-toggle {
        position: absolute;
        right: var(--margin);
        display: none;
    }

    @media(max-width: 989px) {
        &.home-calendar-container__modal--show {
            height: 100%;
        }
    }

    @media(max-width: 1000px) {
        .home-calendar__mobile-toggle {
            display: block
        }

        &.home-calendar-container {
            transform: translateY(calc(100% - 40px));
            transition: transform 0.3s;
        }
    }

    .home-calendar {
        position: relative;
        flex-direction: row;
        z-index: 0;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 0 var(--margin);
    }

    &.home-calendar-container--open {
        transform: translateY(0);
    }


    @media(max-width: 1300px) {
        .home-calendar {
            justify-content: flex-start;
            flex-direction: column;
            padding: var(--margin);
        }
    }

    @media(max-width: 767px) {
        .home-calendar {
            flex-direction: column;
        }
    }


    .home-calendar__col-left {
        display: flex;
        align-items: center;
    }

    .home-calendar__main-title {
        margin: 0 50px 0 0;
    }

    @media(max-width: 1000px) {
        .home-calendar__main-title {
            width: 100%;
            margin: 0 0 20px 0;
        }
    }

    .home-calendar__col-left > div:nth-child(2) {
        // margin-left: 40px;
    }

    .home-calendar__month {
        text-transform: capitalize;
    }

    .home-calendar__month {
        min-width: 150px;
    }

    .home-calendar__year {
        display: inline-block;
    }

    .home-calendar__month > span:nth-child(4) {
        display: inline-block;
        text-decoration: underline;
        position: relative;
        color: var(--color);
        width: 5.5em;
        margin-left: 20px;
    }

    .arrow-next, .arrow-prev {
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    .arrow-next::after {
        content:"";
        position: absolute;
        top: 0.65em;
        right: -2.7em;
        transform: translateY(-50%) rotateZ(-90deg) scale(1.5);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
    }

    .arrow-prev::after {
        content:"";
        position: absolute;
        top: 0.65em;
        right: -1.5em;
        transform: translateY(-50%) rotateZ(90deg) scale(1.5);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid black;
    }

    .arrow-prev:hover::after, .arrow-next:hover::after {
        // border-top: 5px solid var(--color);
        opacity: 0.5;
    }

    .home-calendar__day {
        position: relative;
        display: inline-block;
        padding: calc(2 * var(--margin)) 8px;
        transition-duration: var(--transition-out);
        align-items: center;
        // margin-bottom: 20px;
    }

    .home-calendar__day > span {
        text-align: center;
    }

    .home-calendar__modal--show .home-calendar__day__hitzone {
        position: absolute;
        height: 100px;
        width: 50px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    }

    @media(max-width: 1200px) {
        .home-calendar__col-right {
            margin-left: -5px;
        }

    }

    @media(max-width: 1000px) {
        .home-calendar__col-left {
            flex-direction: column;
            align-items: flex-start;
        }

        .home-calendar__col-right {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            margin-top: 50px;
            margin-left: 0;
            padding-left: 0;
            max-width: 500px;
        }

        .home-calendar__day {
            padding: var(--margin);
            width: fit-content;
        }
    }

    @media(max-width: 989px) {
        .home-calendar__modal--show .home-calendar__day__hitzone {
            display: none;
        }
    }

    @media(max-width: 767px) {
        .home-calendar {
            flex-wrap: wrap;
        }

        .home-calendar__col-right {
            margin-top: 50px;
            margin-left: 0;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding-left: 0;
            width: 100%;
        }

        .home-calendar__day {
            padding: calc( 1.5 * var(--margin));
            width: fit-content;
            min-height: 15px;
            min-width: 15px;
        }

        .arrow-prev::after {
            right: -1.5em;
        }

        .arrow-next::after {
            right: -3em;
        }
    }


    .home-calendar__day > span {
        display: block;
        position: relative;
        // padding-bottom: 10px;
    }

    .home-calendar__day:hover {
        cursor: pointer;
        transition-duration: var(--transition-in);
    }

    .home-calendar__day:hover > span {
        opacity: 0.5;
    }

    .home-calendar__day--has-event::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 27px;
        height: 27px;
        border: 2px solid black;
        border-radius: 999px;
        pointer-events: none;
    }

    .home-calendar__day--has-two-events::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 27px;
        height: 27px;
        border: 2px solid black;
        border-radius: 999px;
        pointer-events: none;
    }

    .home-calendar__day--has-recurring-event::before {
        display: none;
    }

    // .home-calendar__day--has-recurring-event::after {
    //     display: none;
    // }

    .home-calendar__day--has-recurring-event::after {
        content: "";
        position: absolute;
        top: auto;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0.1px;
        height: 0.1px;
        background-color: black;
        border-radius: 999px;
        pointer-events: none;
    }

    @media(max-width: 989px) {
        .home-calendar__day--has-recurring-event::after {
            bottom: 0px;
        }
    }

    @media(max-width: 1580px) {
        // .home-calendar__day--has-event::after {
        //     left: calc(50% - 2.5px);
        //     width: 5px;
        //     height: 5px;
        //     bottom: 0px;
        // }

        // .home-calendar__day--has-two-events::before {
        //     left: calc(50% - 2.5px);
        //     width: 5px;
        //     height: 5px;
        //     bottom: -8px;
        // }
    }

    @media(max-width: 767px) {
        // .home-calendar__day--has-event::after {
        //     left: calc(50% - 2.5px);
        //     width: 5px;
        //     height: 5px;
        //     bottom: 0px;
        // }

        // .home-calendar__day--has-two-events::before {
        //     left: calc(50% - 2.5px);
        //     width: 5px;
        //     height: 5px;
        //     bottom: -8px;
        // }
    }

    .home-calendar__modal {
    display: block;
    pointer-events: auto; /* Ensure we can hover/click inside the modal */
    z-index: 10;
        position: absolute;
        // width: 350px;
        width: 33.3333vw;
        max-height: 600px;
        border: 1px solid black;
        background-color: white;
        z-index: 999;
        overflow: scroll;
        top: 0;
        right: 0;
        transform: translateY(-100%);
        box-shadow: -5px -5px 20px rgba(0,0,0,0.5);
    }


    .home-calendar__modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 998;
    }

    @media(min-width: 576px) {
        .home-calendar__modal {
            margin-left: 0px;
        }
    }

    @media(min-width: 990px) {
        .home-calendar__col-right > div:nth-child(n+15) .home-calendar__modal {
            margin-left: -300px;
        }
    }


    @media(max-width: 767px) {
        .home-calendar__modal {
            position: fixed;
            margin-left: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vw - 40px);
        } 
        
        .home-calendar__modal--show .home-calendar__modal-overlay {
            display: block;
        }
    }
    
    .home-calendar__modal--show .home-calendar__modal {
        display: block;
    }

    .home-calendar__event {
        border-top: var(--border-width) solid black;
    }


    .home-calendar__event > a {
        display: block;
        padding: 10px 10px;
    
        > div {
            flex-basis: 50%;
        }
    
        transition: var(--transition-out);
    
        :hover {
            transition: var(--transition-in);
            cursor: pointer;
        }
    
        :hover {
            color: white;
        }
    }

    .home-calendar__events  .active-link {
        opacity: 1 !important;
        color: var(--black) !important;
    }

    .home-calendar__events > div:not(:first-child) {
        border-top: 1px solid black;
    }

    .home-calendar__date {
        margin-bottom: 5px;
    }

    .home-calendar__information {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 5px 0;

        * {
            margin: 0;
        }
    }

    .home-calendar__information > div {
        flex-basis: 50%;
    }


    .home-calendar__title {
        margin: 20px 0 5px 0;
    }

    .home-calendar__title * {
        font-size: inherit;
    }

    .home-calendar__image {
        height: calc(0.5 * 400px);
    }

    .home-calendar__image img,
    .home-calendar__image span,
    .home-calendar__image div
     {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover !important;
    }
`

const Blank = styled.div``

export default function Calendar({ data = [] }) {
    const router = useRouter();
    const { language = 'fr' } = router.query;
    const locale = language === "fr" ? fr : enGB;

    // 1. State Management
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeModalDay, setActiveModalDay] = useState(null);

    // 2. Generate Calendar Grid (Memoized for performance)
    const { days, blanks, monthLabel, anchorId } = useMemo(() => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        
        // Calculate empty slots at start of month (Monday start)
        // date-fns getDay: 0 (Sun) to 6 (Sat). Adjust for Mon start:
        const dayIdx = getDay(start);
        const prefixCount = dayIdx === 0 ? 6 : dayIdx - 1; 

        const monthDays = eachDayOfInterval({ start, end }).map(date => {
            const dayEvents = data.filter(event => {
                if (!event.dateAndTime) return false;
                const eventStart = parseISO(event.dateAndTime);
                const eventEnd = event.endDateAndTime ? parseISO(event.endDateAndTime) : null;
                
                const isSingle = isSameDay(date, eventStart);
                const isOngoing = eventEnd && date > eventStart && date <= eventEnd;
                return isSingle || isOngoing;
            });

            return {
                date,
                events: dayEvents,
                hasSingle: dayEvents.some(e => !e.endDateAndTime || isSameDay(date, parseISO(e.dateAndTime))),
                hasRecurring: dayEvents.some(e => e.endDateAndTime && !isSameDay(date, parseISO(e.dateAndTime)))
            };
        });

        return {
            days: monthDays,
            blanks: Array(prefixCount).fill(null),
            monthLabel: format(start, 'LLLL yyyy', { locale }),
            anchorId: sanitizeTag(format(start, 'LLLL-yyyy', { locale }))
        };
    }, [currentDate, data, locale]);

    // 3. Handlers
    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(new Date(newDate));
        setActiveModalDay(null); // Close modals on change
    };

    // Lock body scroll when full-screen modal is open on mobile
    useEffect(() => {
        if (activeModalDay !== null && window.innerWidth <= 767) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [activeModalDay]);

    return (
        <Container className={`home-calendar-container ${isMobileOpen ? 'home-calendar-container--open' : ''}`}>
            <div className="home-calendar">
                <div className="home-calendar__col-left">
                    <span 
                        className='home-calendar__main-title p' 
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        Calendrier
                    </span>
                    <div className='home-calendar__mobile-toggle p' onClick={() => setIsMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? '-' : '+'}
                    </div>
                    
                    <div className="home-calendar__month">
                        <div className="arrow-prev" onClick={() => changeMonth(-1)}></div>
                        <div className="arrow-next" onClick={() => changeMonth(1)}></div>
                        <span>
                            <Link href={`/${language}/saison#${anchorId}`}>
                                {monthLabel}
                            </Link>
                        </span>
                    </div>
                </div>

                <div className="home-calendar__col-right">
                    {blanks.map((_, i) => <Blank key={`blank-${i}`} />)}
                
                    {days.map((day, index) => {
                        const isSelected = activeModalDay === index;
                        const hasEvents = day.events.length > 0;

                        return (
                            <div 
                                key={day.date.toISOString()}
                                className={`h5 home-calendar__day
                                    ${hasEvents ? 'home-calendar__day--has-event' : ''} 
                                    ${day.events.length > 1 ? 'home-calendar__day--has-two-events' : ''}
                                    ${(day.hasRecurring && !day.hasSingle) ? 'home-calendar__day--has-recurring-event' : ''}
                                    ${isSelected ? 'active' : ''}
                                    `}

                            // DESKTOP HOVER LOGIC
                                        onMouseEnter={() => {
                                            if (window.innerWidth > 768 && hasEvents) {
                                                setActiveModalDay(index);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (window.innerWidth > 768) {
                                                setActiveModalDay(null);
                                            }
                                        }}                                    
                            >
                        {/* MOBILE CLICK TRIGGER */}
                        <span 
                            className="home-calendar__day__number"
                            onClick={(e) => {
                                if (window.innerWidth <= 768 && hasEvents) {
                                    e.stopPropagation();
                                    setActiveModalDay(index);
                                }
                            }}
                        >
                            {index + 1}
                        </span>

                        {hasEvents && isSelected && (
                            window.innerWidth <= 767 ? (
                                // MOBILE PORTAL (Full Screen)
                                createPortal(
                                    <div className="mobile-modal-root" onClick={(e) => e.stopPropagation()}>
                                        <div className="home-calendar__modal-overlay" onClick={() => setActiveModalDay(null)} />
                                        <div className="home-calendar__modal full-screen">
                                            <button 
                                                className="close-btn" 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setActiveModalDay(null);
                                                }}
                                            >
                                                ✕
                                            </button>
                                            <div className="home-calendar__events">
                                                {day.events.map((event, i) => <Tile key={i} data={event} />)}
                                            </div>
                                        </div>
                                    </div>,
                                    document.body
                                )
                            ) : (
                                // DESKTOP MODAL (Inline Hover)
                                <div 
                                    className="home-calendar__modal" 
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="home-calendar__events">
                                        {day.events.map((event, i) => <Tile key={i} data={event} />)}
                                    </div>
                                </div>
                            )
                        )}                      
                                

                            </div>
                        );
                    })}                    
                </div>
            </div>
        </Container>
    );
}