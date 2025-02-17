import { Input } from "@/components/catalyst/input";
import { Button } from "@/components/catalyst/button";

export default function CodeSearch() {
    return (
        <div className="flex items-center gap-4">
            <Input className="!w-20 md:!w-30 flex-none" maxLength={8} name="code" />
            <Button className="!text-xs md:!text-lg flex-none">Join via code</Button>
        </div>
    );
}