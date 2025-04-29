import React, { useEffect, useRef } from 'react'
import './DoughnutChart.css'

const DoughnutChart = ({ data }) => {
    const donutRef = useRef(null);
    const centerTextRef = useRef(null);

    useEffect(() => {
        const donut = donutRef.current;
        const centerText = centerTextRef.current;
        donut.innerHTML = '';

        let rotation = 0;

        data.forEach(part => {
            const slice = document.createElement('div');
            slice.classList.add('slice');
            slice.style.background = part.color;
            slice.style.transform = `rotate(${rotation}deg) skewY(${90 - part.percent * 3.6}deg)`;
            donut.appendChild(slice);
            ratetion += part.percent * 3.6;
        });

        const total = data.reduce((sum, part) => sum + part.percent, 0);
        centerText.textContent = `${total}%`;
    }, [data]);

    return (
        <div className='donut-container'>
            <div className='donut' ref={donutRef}></div>
            <div className='center-text' ref={centerTextRef}></div>
        </div>
    )
}

export default DoughnutChart