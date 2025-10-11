
import React, { useState } from 'react';
import { Sparkles, Mail, Zap, Shield, Clock, Users, Check, Copy, Menu, X, ChevronRight, Star } from 'lucide-react';

function App() {
    const [emailContent, setEmailContent] = useState('');
    const [tone, setTone] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToGenerator = () => {
        const generatorSection = document.getElementById('generator');
        if (generatorSection) {
            generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleCopy = () => {
        if (!generatedReply) return;
        navigator.clipboard.writeText(generatedReply)
            .then(() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setGeneratedReply('');

        try {
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent,
                    tone
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const reply = data && typeof data === 'object'
                ? data.reply || JSON.stringify(data)
                : data;

            setGeneratedReply(reply);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (err) {
            console.error('API Error:', err);
            const errorMessage = err.message || 'Failed to generate reply. Please check the console and ensure the backend server is running.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-purple-100 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                GemMail
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Features</a>
                            <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Pricing</a>
                            <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About</a>
                            <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Testimonials</a>
                            <button onClick={scrollToGenerator} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-purple-100">
                        <div className="px-4 py-4 space-y-4">
                            <a href="#features" className="block text-gray-700 hover:text-purple-600 font-medium">Features</a>
                            <a href="#pricing" className="block text-gray-700 hover:text-purple-600 font-medium">Pricing</a>
                            <a href="#about" className="block text-gray-700 hover:text-purple-600 font-medium">About</a>
                            <a href="#testimonials" className="block text-gray-700 hover:text-purple-600 font-medium">Testimonials</a>
                            <button onClick={scrollToGenerator} className="w-full px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-semibold">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-semibold mb-6 shadow-sm">
                            <Zap className="w-4 h-4 mr-2 text-purple-600" />
                            AI-Powered Email Assistant
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Write Perfect Emails<br />
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                In Seconds
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Let AI craft professional, personalized email replies. Simply paste your email, choose a tone, and generate the perfect response instantly.
                        </p>
                    </div>

                    {/* Main Generator Card */}
                    <div id="generator" className="max-w-4xl mx-auto scroll-mt-20">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-100">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-3">
                                        Your Email
                                    </label>
                                    <textarea
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all resize-none text-gray-800"
                                        rows={6}
                                        placeholder="Paste the email you want to reply to..."
                                        value={emailContent}
                                        onChange={(e) => setEmailContent(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-3">
                                        Response Tone
                                    </label>
                                    <select
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all appearance-none bg-white cursor-pointer text-gray-800 font-medium"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                    >
                                        <option value="">Select a tone (Optional)</option>
                                        <option value="professional">Professional</option>
                                        <option value="casual">Casual</option>
                                        <option value="friendly">Friendly</option>
                                        <option value="formal">Formal</option>
                                        <option value="direct">Direct</option>
                                        <option value="empathetic">Empathetic</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!emailContent || loading}
                                    className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            <span>Generate Reply</span>
                                        </>
                                    )}
                                </button>

                                {error && (
                                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 font-medium">
                                        {error}
                                    </div>
                                )}

                                {generatedReply && !loading && (
                                    <div className="mt-6 space-y-4">
                                        <label className="block text-sm font-bold text-gray-800">
                                            Generated Reply
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl bg-purple-50 resize-none text-gray-800"
                                                rows={6}
                                                value={generatedReply}
                                                readOnly
                                            />
                                            <button
                                                onClick={handleCopy}
                                                className="absolute top-3 right-3 px-4 py-2 bg-white border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all flex items-center space-x-2 font-semibold text-purple-700"
                                            >
                                                <Copy className="w-4 h-4" />
                                                <span className="text-sm">Copy</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-gray-600">
                            Powerful features to supercharge your email workflow
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: 'Lightning Fast',
                                description: 'Generate professional email replies in seconds, not minutes',
                                gradient: 'from-yellow-400 to-orange-500'
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: 'Secure & Private',
                                description: 'Your emails are processed securely and never stored',
                                gradient: 'from-green-400 to-emerald-600'
                            },
                            {
                                icon: <Mail className="w-8 h-8" />,
                                title: 'Multiple Tones',
                                description: 'Choose from various tones to match your communication style',
                                gradient: 'from-blue-400 to-indigo-600'
                            },
                            {
                                icon: <Clock className="w-8 h-8" />,
                                title: 'Save Time',
                                description: 'Reduce email response time by up to 90%',
                                gradient: 'from-purple-400 to-pink-600'
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: 'Team Ready',
                                description: 'Perfect for individuals and teams of any size',
                                gradient: 'from-pink-400 to-rose-600'
                            },
                            {
                                icon: <Star className="w-8 h-8" />,
                                title: 'AI-Powered',
                                description: 'Advanced AI ensures context-aware, natural responses',
                                gradient: 'from-cyan-400 to-blue-600'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="p-8 bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl border-2 border-purple-100 hover:shadow-2xl hover:scale-105 transition-all">
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-600">
                            Choose the plan that's right for you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: 'Starter',
                                price: '0',
                                description: 'Perfect for trying out GemMail',
                                features: ['50 emails/month', 'Basic tones', 'Email support']
                            },
                            {
                                name: 'Pro',
                                price: '9.99',
                                description: 'For professionals who email daily',
                                features: ['Unlimited emails', 'All tones', 'Priority support', 'Advanced AI', 'Team collaboration'],
                                popular: true
                            },
                            {
                                name: 'Enterprise',
                                price: '29.99',
                                description: 'For teams and organizations',
                                features: ['Everything in Pro', 'Custom AI training', 'Dedicated support', 'API access', 'Advanced analytics']
                            }
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className={`relative p-8 rounded-3xl transition-all hover:scale-105 ${
                                    plan.popular
                                        ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl scale-105'
                                        : 'bg-white border-2 border-purple-200 shadow-xl'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full text-sm font-bold shadow-lg">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`mb-6 ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>
                                <div className="mb-6">
                                    <span className="text-5xl font-extrabold">${plan.price}</span>
                                    <span className={`text-lg ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>/month</span>
                                </div>
                                <button onClick={scrollToGenerator} className={`w-full py-4 rounded-2xl font-bold transition-all mb-6 ${
                                    plan.popular
                                        ? 'bg-white text-purple-600 hover:bg-gray-50 shadow-lg'
                                        : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:shadow-xl'
                                }`}>
                                    Get Started
                                </button>
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center space-x-3">
                                            <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-purple-600'}`} />
                                            <span className={`${plan.popular ? 'text-purple-50' : 'text-gray-700'} font-medium`}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            About GemMail
                        </h2>
                        <p className="text-xl text-gray-600">
                            Your AI-powered email companion
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Revolutionizing Email Communication
                            </h3>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                GemMail was born from a simple idea: everyone deserves to communicate effectively without spending hours crafting the perfect email response.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Using cutting-edge AI technology, we've created a tool that understands context, tone, and intent to generate professional email replies in seconds. Whether you're a busy professional, entrepreneur, or team leader, GemMail adapts to your communication style.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our mission is to free you from email overload so you can focus on what truly matters in your work and life.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-12 border-2 border-purple-200">
                            <div className="space-y-8">
                                <div>
                                    <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                        30+
                                    </div>
                                    <p className="text-gray-700 font-semibold text-lg">Emails Generated</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                        90%
                                    </div>
                                    <p className="text-gray-700 font-semibold text-lg">Time Saved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                        <p className="text-xl text-purple-50 max-w-3xl mx-auto leading-relaxed">
                            We envision a world where technology empowers human communication, making it more efficient, meaningful, and stress-free. GemMail is just the beginning of our journey to transform how professionals interact in the digital age.
                        </p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Loved by many
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what our users have to say
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Krishnendu Manna',
                                role: 'Founder of Bramha Media Group',
                                content: 'GemMail has transformed how I handle emails. I save hours every week!'
                            },
                            {
                                name: 'Vardan Gupta',
                                role: '3d Modeling and Texture Artist',
                                content: 'The AI is incredibly smart. It understands context perfectly and generates natural responses.'
                            },
                            {
                                name: 'Rajesh Gupta',
                                role: 'Atiana Bus Manager',
                                content: 'Our team response time improved by 80%. This tool is a game-changer!'
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="p-8 bg-white rounded-3xl border-2 border-purple-100 hover:shadow-xl transition-all">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-800 mb-6 italic font-medium leading-relaxed">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-purple-600 text-sm font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to Transform Your Email Workflow?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                        Join thousands of professionals who are already saving time with GemMail
                    </p>
                    <button onClick={scrollToGenerator} className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 mx-auto">
                        <span>Start Free Trial</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">GemMail</span>
                            </div>
                            <p className="text-sm leading-relaxed">AI-powered email assistant for modern professionals.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                                <li><a href="#about" className="hover:text-purple-400 transition-colors">About</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#about" className="hover:text-purple-400 transition-colors">About Us</a></li>
                                <li><a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>© 2024 GemMail. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Notification Toast */}
            {showNotification && (
                <div className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-pulse">
                    <Check className="w-5 h-5 text-white" />
                    <span className="font-semibold">Copied to clipboard!</span>
                </div>
            )}
        </div>
    );
}

export default App;