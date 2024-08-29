import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleIcon, CodeIcon, DatabaseIcon, GitBranchIcon, LineChartIcon, NetworkIcon, CheckIcon, Workflow, GithubIcon } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'

export default function Landing() {
    const [currentPage, setCurrentPage] = useState('home')
    const navigation = useNavigate();

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />
            case 'features':
                return <FeaturesPage />
            case 'pricing':
                return <PricingPage />
            case 'about':
                return <AboutPage />
            case 'contact':
                return <ContactPage />
            default:
                return <HomePage />
        }
    }

    return (
        <div className="flex flex-col min-h-screen ">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 left-0 z-20 bg-black">
                <Link className="flex items-center justify-center" to="" onClick={() => setCurrentPage('home')}>
                    <Workflow className="h-8 w-8 mr-2" />
                    <span className="font-bold text-2xl">xlFlow</span>
                </Link>
                <nav className="ml-auto  flex justify-between ">
                    <Button variant={"outline"} onClick={() => navigation("/dashboard")}>
                        Go to dashboard 
                    </Button>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" to="/dashboard" onClick={() => setCurrentPage('features')}>
                    </Link>
                </nav>

            </header>
            <main className="flex-1">
                {renderPage()}
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">©2024 Developed by {" "}
                <a href="https://github.com/ksanjeeb" target="_blank" className='underline font-bold text-blue-500'>©ksanjeeb</a>
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" to="/">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" to="/">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

function HomePage() {
    const navigation = useNavigate();

    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-28 xl:pb-40">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Visualize Your Data Workflow
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    A node-based editor designed for seamless data exploration, analysis, and transformation. Empower
                                    your workflow with a visual interface that eliminates the need for coding.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" onClick={() => navigation("/dashboard")}>Get Started</Button>
                                <Button variant="outline" size="lg" >Learn more</Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <img src={"/image-1.png"} className='h-72 my-14 w-full rounded-lg overflow-hidden' />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <NetworkIcon className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Visual Node-Based Editor</h3>
                            <p className="text-muted-foreground">
                                Create complex data workflows by connecting nodes, without writing a single line of code.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <DatabaseIcon className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Built-in Transformation Blocks</h3>
                            <p className="text-muted-foreground">
                                Connect to various data sources and formats with pre-built connectors and transformations.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <LineChartIcon className="h-12 w-12 mb-4 text-primary" />
                            <h3 className="text-xl font-bold mb-2">Real-time Analysis & visualization </h3>
                            <p className="text-muted-foreground">
                                Visualize and analyze your data in real-time as you build your workflow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold tracking-tighter sm:text-2xl">
                                Ready to Transform Your Data Workflow for free? Yes it's open source.
                            </h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl">
                                <strong>xlFlow</strong> is based on open source library <span className='text-red-500'>react-flow</span>
                            </p>

                        </div>
                        <div className="w-full max-w-sm space-y-16 ">
                            <form className="flex space-x-2">
                                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                                <Button type="submit" onClick={() => navigation("/dashboard")}>Get Started</Button>
                            </form>

                            <div
                                className='flex flex-row gap-2 justify-center text-xl font-bold hover:text-sky-600 p-4 text-center border-[2px] hover:bg-muted rounded-lg outline-neutral-500 outline outline-2 outline-offset-4 cursor-pointer'
                                onClick={() => window.open('https://github.com/ksanjeeb/xlflow', '_blank', 'noopener,noreferrer')}
                            >
                                <GithubIcon className='self-center w-8 h-8' />
                                <p className='self-center'>
                                    github.com/ksanjeeb/xlflow
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function FeaturesPage() {
    return (
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                    <NetworkIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Visual Node-Based Editor</h3>
                    <p className="text-muted-foreground">
                        Create complex data workflows by connecting nodes, without writing a single line of code. Drag and drop nodes to build your data pipeline visually.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <DatabaseIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Data Integration</h3>
                    <p className="text-muted-foreground">
                        Connect to various data sources and formats with pre-built connectors and transformations. Support for SQL databases, APIs, file formats, and more.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <LineChartIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Real-time Analysis</h3>
                    <p className="text-muted-foreground">
                        Visualize and analyze your data in real-time as you build your workflow. Interactive charts and graphs update as you modify your data pipeline.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <CodeIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Custom Functions</h3>
                    <p className="text-muted-foreground">
                        Extend functionality with custom nodes and functions when needed. Write custom Python or JavaScript code to handle complex transformations.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <GitBranchIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Version Control</h3>
                    <p className="text-muted-foreground">
                        Track changes, collaborate with team members, and manage different versions of your workflows. Integrated Git-like version control system.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <CircleIcon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Automated Scheduling</h3>
                    <p className="text-muted-foreground">
                        Set up automated runs of your workflows on a schedule or trigger-based events. Integrate with external systems for seamless data processing.
                    </p>
                </div>
            </div>
        </div>
    )
}

function PricingPage() {
    const plans = [
        {
            name: "Basic",
            price: "$9",
            features: ["Up to 5 workflows", "1,000 node executions/month", "Community support", "Basic integrations"],
        },
        {
            name: "Pro",
            price: "$29",
            features: ["Unlimited workflows", "10,000 node executions/month", "Priority support", "Advanced integrations", "Team collaboration"],
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["Unlimited everything", "24/7 dedicated support", "Custom integrations", "On-premise deployment option", "Advanced security features"],
        },
    ]

    return (
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h1>
            <div className="grid gap-8 md:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="flex flex-col p-6 bg-muted rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                        <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
                        <ul className="mb-6 flex-grow">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center mb-2">
                                    <CheckIcon className="h-5 w-5 mr-2 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button className="w-full">Choose Plan</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AboutPage() {
    return (
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">About DataFlow</h1>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        DataFlow was founded in 2023 with a mission to democratize data analysis and transformation. Our team of data scientists and software engineers came together to create a tool that would make complex data operations accessible to everyone, regardless of their coding experience.
                    </p>
                    <p className="text-muted-foreground">
                        We believe that data should be a powerful tool in everyone's hands, not just those with advanced programming skills. That's why we've developed our node-based editor to be intuitive, powerful, and flexible.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Vision</h2>
                    <p className="text-muted-foreground">
                        We envision a world where data-driven decision making is the norm, not the exception. Where businesses of all sizes can harness the power of their data without needing a team of data engineers. Where insights are just a few clicks away, and complex data pipelines can be built in minutes, not months.
                    </p>
                    <p className="text-muted-foreground">
                        Join us on our journey to revolutionize the way the world works with data.
                    </p>
                </div>
            </div>
        </div>
    )
}

function ContactPage() {
    return (
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Contact Us</h1>
            <div className="max-w-md mx-auto">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                        <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                        <textarea
                            id="message"
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your message"
                        ></textarea>
                    </div>
                    <Button className="w-full">Send Message</Button>
                </form>
            </div>
        </div>
    )
}