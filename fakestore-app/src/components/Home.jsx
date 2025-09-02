import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Home(){
    return(
        <>
        <h1 className="mt-5">WELCOME TO FAKESTORE </h1><br />
        <Button as={Link} to="/products" variant="primary">View Products</Button>
         </>
       
    );
}
export default Home;