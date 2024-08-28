import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { stringObject } from "@/types";

export function AvatarComponent({ img, alt }: stringObject) {
  return (
    <Avatar>
      <AvatarImage src={img} alt={alt} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
}
