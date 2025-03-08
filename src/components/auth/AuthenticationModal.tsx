
import React from 'react';
import { 
  SignIn, 
  SignUp
} from '@clerk/clerk-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface AuthenticationModalProps {
  isOpen: boolean;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({ isOpen }) => {
  const [isSignIn, setIsSignIn] = React.useState(true);
  
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-2xl font-semibold mb-6 text-center">
          {isSignIn ? 'Iniciar Sesión' : 'Registrarse'}
        </DialogTitle>
        
        <div className="w-full">
          {isSignIn ? (
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border border-gray-300 text-gray-600",
                  formButtonPrimary: "bg-lovable-lavender hover:bg-lovable-lavender/90"
                }
              }}
            />
          ) : (
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border border-gray-300 text-gray-600",
                  formButtonPrimary: "bg-lovable-lavender hover:bg-lovable-lavender/90"
                }
              }}
            />
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          {isSignIn ? (
            <p>
              ¿No tienes una cuenta?{" "}
              <button 
                className="text-lovable-lavender hover:underline"
                onClick={() => setIsSignIn(false)}
              >
                Regístrate
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button 
                className="text-lovable-lavender hover:underline"
                onClick={() => setIsSignIn(true)}
              >
                Inicia sesión
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationModal;
