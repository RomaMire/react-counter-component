import { useEffect, useState, useRef } from "react";

import useIntersectionObserver from "../../hooks/use-intersectionObserver";

import styles from "./counter.module.scss";

const Counter = (props) => {
	const [num, setNumb] = useState(0);
	const numberRef = useRef();

	const { heading, number, text, speed, imgsrc, alt } = props; // heading - title of the component; number - number to calculate; text - description; imgsrc - url of an image; alt -an alt attribiute for img

	const { isVisible } = useIntersectionObserver(
		numberRef,
		"0px 0px -200px 0px"
	); //  Takes the particular element via useRef() and the root margin of intersection observer in custom hook.

	useEffect(() => {
		const value = numberRef.current.dataset.number * 1;
		let increase = Math.ceil(value / 300); // .ceil() - rounds up and returns the smallest integer greater than or equal to a given number. (MDN Web Docs)

		if (isVisible) {
			// return the true or false from custom hook
			if (num < value * 1) {
				const timeout = setTimeout(() => {
					setNumb((prevNum) => prevNum + Math.ceil(increase)); // "increase" - particular number of steps to reach the {number} value
				}, speed);
			} else {
				// after reaching higher value than {number} - set the number as a value
				setNumb(value);
			}
		}
	}, [num, isVisible, speed]);

	return (
		<div className={styles.counter}>
			<div className={styles.counter__img}>
				<img src={imgsrc} alt={alt} />
			</div>
			<p className={styles.counter__heading}>{heading}</p>

			<span
				className={styles.counter__number}
				data-number={number}
				ref={numberRef}
			>
				{num}
			</span>
			<p className={styles.counter__text}>{text}</p>
		</div>
	);
};

export default Counter;
