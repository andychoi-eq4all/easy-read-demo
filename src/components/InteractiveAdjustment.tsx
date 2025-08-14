import React from "react";
import { Button } from "@/components/ui/button";
import { useSimplification } from "@/hooks/useSimplification";
import { RefreshCwIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const InteractiveAdjustment: React.FC = () => {
  const { options, updateOptions, applyAdjustments } = useSimplification();

  const handleSimplicityChange = (value: number[]) => {
    updateOptions({ simplicity: value[0] });
  };

  const handleReadingLevelChange = (value: string) => {
    updateOptions({ readingLevel: value as any });
  };

  const handleToneChange = (value: string) => {
    updateOptions({ tone: value as any });
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Adjustment</h3>
      <p className="text-gray-600 mb-6">Adjust the simplified text to match your needs</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Simplicity Level */}
        <div>
          <Label htmlFor="simplicity" className="block text-sm font-medium text-gray-700 mb-2">
            Simplicity Level
          </Label>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Complex</span>
            <Slider 
              id="simplicity"
              min={1} 
              max={10} 
              step={1}
              value={[options.simplicity]}
              onValueChange={handleSimplicityChange}
              className="w-full h-2"
            />
            <span className="text-xs text-gray-500 ml-2">Simple</span>
          </div>
        </div>
        
        {/* Reading Level */}
        <div>
          <Label htmlFor="reading-level" className="block text-sm font-medium text-gray-700 mb-2">
            Target Reading Level
          </Label>
          <Select value={options.readingLevel} onValueChange={handleReadingLevelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reading level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elementary">Elementary (Grades 1-4)</SelectItem>
              <SelectItem value="middle">Middle School (Grades 5-8)</SelectItem>
              <SelectItem value="high">High School (Grades 9-12)</SelectItem>
              <SelectItem value="college">College Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Tone Adjustment */}
        <div>
          <Label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </Label>
          <Select value={options.tone} onValueChange={handleToneChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="secondary"
          onClick={applyAdjustments}
          className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <RefreshCwIcon className="h-4 w-4 mr-1" /> Update Simplification
        </Button>
      </div>
    </div>
  );
};

export default InteractiveAdjustment;
