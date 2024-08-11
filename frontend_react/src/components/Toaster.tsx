import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type ToastProps = {
  title: string;
  description: string;
};

export const ToastDemo = ({ title, description }: ToastProps) => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: title,
          description: description,
        });
      }}
    >
      Show Toast
    </Button>
  );
};