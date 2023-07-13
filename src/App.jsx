import Chatbox from './components/Chatbox';
import { ColorProvider } from './color_context';

function App() {
  return (
    <>
      <ColorProvider>
        <Chatbox />
      </ColorProvider>
    </>
  );
}

export default App;
