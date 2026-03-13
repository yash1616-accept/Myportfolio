import React from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const About: React.FC = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"]
        },
        {
            title: "Backend",
            skills: ["Node.js", "Python", "Flask", "REST APIs", "Express.js", "Next.js"]
        },
        {
            title: "DevOps & Cloud",
            skills: ["Docker", "Jenkins", "AWS Basics", "CI/CD", "GitHub Actions"]
        },
        {
            title: "Systems & Tools",
            skills: ["Linux", "Git", "SQL/NoSQL", "System Design"]
        }
    ];

    return (
        <section id="About" className="relative min-h-screen w-full bg-[#030303] py-24 lg:py-32 px-6 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
                >
                    {/* Left Side: Introduction */}
                    <div className="flex flex-col space-y-8">
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h2 className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase">
                                01. About Me
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                                Engineering student <br />
                                <span className="text-gray-500">with a focus on scalable systems.</span>
                            </h3>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                            <motion.div variants={itemVariants} className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                                <p>
                                    Hello! I'm <span className="text-white font-medium">Yash Gaikwad</span>, a final-year engineering student
                                    driven by the challenge of building real-world software. My journey is rooted in
                                    <span className="text-white"> Full Stack Development</span>, with a deep-seated interest in the
                                    mechanics of <span className="text-white">DevOps and Cloud Architecture</span>.
                                </p>
                                <p>
                                    I thrive at the intersection of clean code and system efficiency. While I enjoy
                                    crafting intuitive interfaces, my true passion lies in backend logic, automation,
                                    and building robust <span className="text-white">CI/CD pipelines</span> that ensure seamless software delivery.
                                    Additionally, I am an enthusiast in <span className="text-white">AI and Generative AI</span>,
                                    exploring how Machine Learning can be integrated into modern web applications.
                                </p>
                                <p>
                                    Currently, I am focused on mastering <span className="text-white">modern Full Stack technologies</span>
                                    while staying at the forefront of <span className="text-white">GenAI innovation</span>.
                                    I value continuous learning and the pursuit of excellence in every line of code,
                                    aiming to contribute to high-impact software engineering and DevOps roles.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
                                <span className="w-12 h-[1px] bg-gray-800"></span>
                                OPEN TO INTERNSHIPS & FULL-TIME ROLES
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Skill Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 transition-colors group"
                            >
                                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <span className="text-blue-500 text-xs opacity-50">0{idx + 1}.</span>
                                    {category.title}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 text-xs font-medium rounded-md bg-white/[0.03] text-gray-400 group-hover:text-blue-400 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Mindset Card */}
                        <motion.div
                            variants={itemVariants}
                            className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10"
                        >
                            <h4 className="text-white font-semibold mb-2 italic">Professional Mindset</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Prioritizing modularity, test-driven development, and high availability.
                                I don't just write code; I build solutions that scale.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;