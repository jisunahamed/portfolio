import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Play, CheckCircle2, Loader2, Database, Brain, FileText, Send } from "lucide-react";

const steps = [
    { id: 1, label: "Receiving Request", icon: Send, duration: 1000 },
    { id: 2, label: "Scraping Data", icon: Database, duration: 2000 },
    { id: 3, label: "AI Analysis (GPT-4)", icon: Brain, duration: 2500 },
    { id: 4, label: "Generating Report", icon: FileText, duration: 1500 },
    { id: 5, label: "Emailing Results", icon: CheckCircle2, duration: 1000 },
];

const AutomationDemo = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);

    const runSimulation = () => {
        setIsRunning(true);
        setCurrentStep(0);
        setLogs(["Starting automation workflow..."]);
        setCompleted(false);
    };

    useEffect(() => {
        if (!isRunning || currentStep >= steps.length) {
            if (currentStep >= steps.length) {
                setIsRunning(false);
                setCompleted(true);
                setLogs(prev => [...prev, "Workflow completed successfully!"]);
            }
            return;
        }

        const step = steps[currentStep];
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing: ${step.label}...`]);

        const timer = setTimeout(() => {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✔ Completed: ${step.label}`]);
            setCurrentStep(prev => prev + 1);
        }, step.duration);

        return () => clearTimeout(timer);
    }, [isRunning, currentStep]);

    return (
        <section className="py-20 bg-black/40 border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Left: Explanation */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Architecture Demo
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold">
                            See <span className="text-gradient">Automation</span> in Action
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            This is a simulation of a standard <strong>Lead Qualification Workflow</strong> built with n8n.
                            Real-world systems handle thousands of these requests instantly—parsing data, making decisions with AI, and syncing to your CRM without human intervention.
                        </p>

                        <div className="pt-4">
                            <Button
                                size="lg"
                                onClick={runSimulation}
                                disabled={isRunning}
                                className="group relative overflow-hidden"
                            >
                                {isRunning ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2 fill-current" />
                                        Run Live Demo
                                    </>
                                )}
                                {/* Progress bar background for button */}
                                {isRunning && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-white/30"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 8, ease: "linear" }}
                                    />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Right: Visualizer */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl">
                            {/* Fake Window Header */}
                            <div className="h-10 bg-muted/50 border-b border-border/50 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                <span className="ml-2 text-xs font-mono text-muted-foreground">workflow_engine.ts</span>
                            </div>

                            {/* Visualization Area */}
                            <div className="p-6 h-[400px] flex flex-col gap-4">
                                {/* Pipeline visual */}
                                <div className="flex justify-between items-center mb-6 relative">
                                    {/* Connecting Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                                        />
                                    </div>

                                    {steps.map((step, index) => {
                                        const isActive = index === currentStep;
                                        const isDone = index < currentStep;
                                        const StepIcon = step.icon;

                                        return (
                                            <div key={step.id} className="relative flex flex-col items-center gap-2">
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        backgroundColor: isActive ? "hsl(var(--primary))" : isDone ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                                        scale: isActive ? 1.2 : 1,
                                                    }}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-background transition-colors duration-300 z-10`}
                                                >
                                                    <StepIcon className={`w-4 h-4 ${isActive || isDone ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                                </motion.div>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-indicator"
                                                        className="absolute -inset-2 bg-primary/20 rounded-full blur-md -z-10"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Logs Console */}
                                <div className="flex-1 bg-black/50 rounded-lg p-4 font-mono text-xs overflow-y-auto custom-scrollbar border border-white/5 space-y-1">
                                    <AnimatePresence initial={false}>
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`${log.includes("✔") ? "text-green-400" : "text-blue-300"}`}
                                            >
                                                {log}
                                            </motion.div>
                                        ))}
                                        {logs.length === 0 && (
                                            <span className="text-muted-foreground italic">Ready to start...</span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AutomationDemo;
