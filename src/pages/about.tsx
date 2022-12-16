import { NextPage } from 'next';
import { RandomSquare } from '../components/RandomSquare';

interface Props {}

const About: NextPage<Props> = ({}) => {
    return (
        <>
            <RandomSquare></RandomSquare>
            <div>About page!</div>
        </>
    );
};

export default About;
