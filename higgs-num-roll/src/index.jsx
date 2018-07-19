import React from 'react';
import { render } from 'react-dom';
import NumRoll from './components/NumRoll';
import styles from './index.scss';

render(
    <NumRoll
        from={0}
        to={500}
        duration={2500}
        ease={true}
        style={{ fontSize: 50 }}
        className={styles.num}
    />,
    document.getElementById('app')
);
