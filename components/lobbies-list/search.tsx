import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";

export default function CodeSearch() {
    return (
        <div className="flex items-center gap-4">
            <Input className="!w-40 flex-none" name="code" />
            <Button className="flex-none">Join via code</Button>
        </div>
    );
}