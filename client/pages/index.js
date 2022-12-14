import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>you are signed in</h1>
  ) : (
    <h1>you are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/current');

  return data;
};

export default LandingPage;
