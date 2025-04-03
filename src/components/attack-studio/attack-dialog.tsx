import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Attack } from "@/types/rapper";
import { AttackStudio } from "./attack-studio";
import { AttackPreview } from "./attack-preview";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AttackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attack?: Partial<Attack>;
  onSave: (attack: Partial<Attack>) => void;
}

export function AttackDialog({ open, onOpenChange, attack, onSave }: AttackDialogProps) {
  const [currentAttack, setCurrentAttack] = useState<Partial<Attack> | undefined>(attack);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = (newAttack: Partial<Attack>) => {
    setCurrentAttack(newAttack);
    onSave(newAttack);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        <DialogTitle>Édition de l'attaque</DialogTitle>
        <DialogDescription>
          Modifiez les paramètres de l'attaque et prévisualisez l'animation
        </DialogDescription>
        <div className="flex-1 overflow-hidden mt-4">
          <AttackStudio
            attack={currentAttack}
            onSave={handleSave}
            autoPreview={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
