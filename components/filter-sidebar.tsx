import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FilterSidebar() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Filters</h3>

      <Accordion type="multiple" defaultValue={["category", "level", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="programming" />
                <label
                  htmlFor="programming"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Programming
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="design" />
                <label
                  htmlFor="design"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Design
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="business" />
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Business
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <label
                  htmlFor="marketing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marketing
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="data-science" />
                <label
                  htmlFor="data-science"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Data Science
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger className="text-base font-medium">Difficulty Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="beginner" />
                <label
                  htmlFor="beginner"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Beginner
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="intermediate" />
                <label
                  htmlFor="intermediate"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Intermediate
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="advanced" />
                <label
                  htmlFor="advanced"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Advanced
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider defaultValue={[50]} max={100} step={1} />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">$0</span>
                <span className="text-sm text-gray-500">$100+</span>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="free" />
                <label
                  htmlFor="free"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Free Courses Only
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="provider">
          <AccordionTrigger className="text-base font-medium">Provider</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="coursera" />
                <label
                  htmlFor="coursera"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Coursera
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="udemy" />
                <label
                  htmlFor="udemy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Udemy
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="edx" />
                <label
                  htmlFor="edx"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  edX
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pluralsight" />
                <label
                  htmlFor="pluralsight"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pluralsight
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex space-x-3">
        <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
          Reset
        </button>
        <button className="w-full py-2 px-4 bg-teal-600 rounded-lg text-white text-sm font-medium hover:bg-teal-700 transition-colors">
          Apply
        </button>
      </div>
    </div>
  )
}
