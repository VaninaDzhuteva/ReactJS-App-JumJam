
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../public/styles/index.css'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './contexts/UserContext.jsx'
import { RecipeProvider } from './contexts/RecipeContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <UserProvider>
            <RecipeProvider>
                <App />
            </RecipeProvider>
        </UserProvider>
    </BrowserRouter>
   
)
