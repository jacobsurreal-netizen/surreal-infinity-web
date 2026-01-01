"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Send } from "lucide-react"

function IceParticles() {
  const particles = Array.from({ length: 25 }) // mírně zvýšen počet pro lepší vizuál
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2
        const color = i % 2 === 0 ? "oklch(0.75 0.18 190)" : "oklch(0.6 0.2 300)" // Tyrkysová vs Fialová
        const tx = (Math.random() - 0.5) * 250
        const ty = (Math.random() - 0.5) * 250
        const delay = Math.random() * 5
        const duration = 4 + Math.random() * 3
        const rotate = Math.random() * 360
        // délka stopy 25 - 50 px
        const trailLength = 25 + Math.random() * 25

        return (
          <div
            key={i}
            className="ice-particle animate-ice-particle"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                left: `${50 + (Math.random() - 0.5) * 35}%`,
                top: `${50 + (Math.random() - 0.5) * 35}%`,
                backgroundColor: color,
                "--particle-color": color,
                "--trail-length": `${trailLength}px`,
                "--tw-translate-x": `${tx}px`,
                "--tw-translate-y": `${ty}px`,
                "--tw-rotate": `${rotate}deg`,
                "--ice-delay": `${delay}s`,
                "--ice-duration": `${duration}s`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Detekce swipu nahoru
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientY
    if (touchStart - touchEnd > 70) onEnter() // Swipe nahoru o více než 70px
    setTouchStart(null)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black cursor-pointer overflow-hidden"
      onClick={onEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SURREAL%20IFINITY%20loop-RwVE9lj75qSLeGRMu2mZ4D70Ud2e9N.mp4" type="video/mp4" />
      </video>

      {/* Overlay pro lepší čitelnost a hloubku */}
      <div className="absolute inset-0 video-overlay" />

      {/* Interaktivní nápověda */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center space-y-4 pointer-events-none">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-primary/60"
        >
          <ChevronDown className="rotate-180 w-8 h-8 glow-turquoise" />
        </motion.div>
        <p className="font-orbitron text-[10px] tracking-[0.5em] text-white/50 uppercase">
          Klikni nebo táhni nahoru pro vstup
        </p>
      </div>
    </motion.div>
  )
}

function DustParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="dust-particle opacity-0 animate-in fade-in"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
            animation: `drift ${Math.random() * 20 + 20}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function EclipsePunkLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>{showIntro && <IntroScreen key="intro" onEnter={() => setShowIntro(false)} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Background Ambience */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 w-full h-[120%] animate-bg-scroll">
            <div
              className="w-full h-full bg-cover bg-center opacity-40 scale-125"
              style={{ backgroundImage: "url('/images/purple-universe-best-hd-wallpaper-61746.jpg')" }}
            />
          </div>
          <div className="absolute inset-0 bg-eclipse-gradient" />
          <DustParticles />
        </div>

        {/* Navigation */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/80 backdrop-blur-md border-primary/30" : "bg-transparent border-transparent"}`}
        >
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-10 w-10">
                  <div className="absolute inset-0 border-2 border-primary rounded-full glow-gold group-hover:scale-110 transition-transform" />
                  <ChevronDown className="absolute inset-0 m-auto h-6 w-6 text-primary" />
                </div>
                <span className="font-orbitron tracking-widest text-lg hidden sm:block">SURREAL</span>
              </Link>
              <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <img src="https://blob.v0.app/discord-icon.png" alt="Discord" className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <img src="https://blob.v0.app/twitter-icon.png" alt="Twitter" className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <img src="https://blob.v0.app/youtube-icon.png" alt="Youtube" className="h-6 w-6" />
                </Link>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 font-orbitron text-[10px] tracking-[0.2em] uppercase">
              <Link href="#manifest" className="hover:text-primary transition-colors">
                Manifest
              </Link>
              <Link href="#kodex" className="hover:text-primary transition-colors">
                Kodex
              </Link>
              <Link href="#pthia" className="hover:text-secondary transition-colors text-secondary/80">
                ΠTHIꓥ
              </Link>
              <Link href="#o-projektu" className="hover:text-primary transition-colors">
                O projektu
              </Link>
              <Link
                href="#kontakt"
                className="hover:text-primary transition-colors border border-primary/50 px-4 py-2 rounded-full"
              >
                Kontakt
              </Link>
            </nav>
          </div>
        </header>

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="relative mb-8 mt-[250px] animate-in fade-in zoom-in duration-1000">
              <IceParticles />
              <img
                src="/images/surreal-infinity-chandra.png"
                alt="Surreal Infinity Logo"
                className="h-56 md:h-[19rem] glow-turquoise relative z-10 scale-[1.2]"
              />
            </div>

            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron tracking-tighter text-glow-turquoise">
                SURREAL INFINITY
              </h1>
              <h2 className="text-xl md:text-2xl font-orbitron tracking-[0.3em] text-secondary">
                ECLIPSEpunk Codex v2.0
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground tracking-[0.4em] uppercase py-4">
                Hybridní artefakt <span className="text-primary mx-2">•</span> Mystic Manual{" "}
                <span className="text-primary mx-2">•</span> Signál po Zatmění
              </p>
            </div>

            <div className="mt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <Button
                asChild
                className="relative bg-transparent hover:bg-transparent text-primary font-orbitron tracking-widest px-16 h-20 rounded-none transition-all group border-none"
              >
                <a
                  href="#vstupni-brany"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("vstupni-brany")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <img
                    src="/images/r-c3-81me-c4-8cek-20bitmapa.png"
                    alt="Frame"
                    className="absolute inset-0 w-full h-full object-contain glow-turquoise group-hover:scale-105 transition-transform"
                  />
                  <span className="relative z-10 flex items-center">
                    ENTER THE CONTINUUM
                    <ChevronDown className="ml-4 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </span>
                </a>
              </Button>
            </div>

            <div className="absolute bottom-10 animate-bounce text-primary/40">
              <ChevronDown size={32} />
            </div>
          </section>

          {/* Tagline Section with Hover Effect */}
          <section id="manifest" className="py-32 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto border-y border-primary/20 py-12 group">
              <h3 className="text-2xl md:text-3xl font-orbitron tracking-[0.5em] text-primary transition-all duration-700">
                PO ÚPLNÉM ZATMĚNÍ, POSTAVÍME ZNOVU
              </h3>

              <div className="mt-8 space-y-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 h-0 group-hover:h-auto overflow-hidden text-pretty lg:px-20">
                <p className="text-muted-foreground leading-relaxed font-orbitron text-sm">
                  Surreal Infinity je český projekt propojující světotvorbu, vědecké přemýšlení a komunitní spolupráci.
                  Soustředíme se na rigorózní spekulaci, kde každý nápad prochází náročným „torture testem“ vědecké
                  metody, abychom vybudovali skutečně živoucí a uvěřitelné universum.
                </p>
                <p className="text-muted-foreground leading-relaxed font-orbitron text-sm">
                  ECLIPSEpunk je naše estetika i filosofie světa po „zatmění“. Je to mix temné kosmické futuristiky a
                  naděje po kolapsu. Rekonstruujeme civilizaci v rovnováze mezi světlem a tmou, kde se mýtus potkává s
                  technologií.
                </p>
              </div>

              {/* Mobile View text (always visible) */}
              <div className="lg:hidden mt-8 space-y-6 text-muted-foreground text-sm font-orbitron">
                <p>Surreal Infinity propojuje světotvorbu a vědecké přemýšlení skrze rigorózní spekulaci.</p>
                <p>ECLIPSEpunk je estetika světa po kolapsu, kde budujeme novou rovnováhu civilizace.</p>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section className="py-24 container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "INFINITY",
                  sub: "Nezačíná, nekončí",
                  img: "/images/infinity-20bitmapa.png",
                  color: "glow-turquoise",
                },
                {
                  title: "DUALITA",
                  sub: "Světlo / tma",
                  img: "/images/dualita-20bitmapa.png",
                  color: "glow-turquoise",
                },
                {
                  title: "TRANSFORMACE",
                  sub: "Mimo vše běžné",
                  img: "/images/transformace-20bitmapa.png",
                  color: "glow-turquoise",
                },
                {
                  title: "HARMONIE",
                  sub: "Řád v chaosu",
                  img: "/images/harmonie-20bitmapa.png",
                  color: "glow-turquoise",
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="group p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 bg-black/40 backdrop-blur-sm text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className={`mb-6 flex justify-center ${pillar.color}`}>
                      <img
                        src={pillar.img || "/placeholder.svg"}
                        alt={pillar.title}
                        className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-[0_0_10px_rgba(255,165,0,0.3)]"
                      />
                    </div>
                    <h4 className="font-orbitron tracking-[0.3em] mb-2">{pillar.title}</h4>
                    <p className="text-xs text-muted-foreground font-orbitron uppercase tracking-widest">
                      {pillar.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Entrance Gates (Rozcestník) */}
          <section id="vstupni-brany" className="py-32 bg-black/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-orbitron tracking-[0.4em] mb-4">VSTUPNÍ BRÁNY</h2>
                <p className="text-muted-foreground font-orbitron text-sm tracking-widest">
                  Vyber si hloubku svého ponoru do Continuum.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Codex Card */}
                <div className="group relative p-12 border border-primary/20 bg-black/60 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all" />
                  <h3 className="text-2xl font-orbitron tracking-widest mb-6 text-primary">KODEX ECLIPSEPUNK</h3>
                  <p className="text-muted-foreground font-orbitron text-sm leading-relaxed mb-8">
                    Živoucí databáze a lore bible univerza. Od technologií Prastarých přes ΠΘI civilizaci až po pravidla
                    světa zpevněná výsledky našich torture testů.
                  </p>
                  <Button className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-black font-orbitron tracking-widest transition-all glow-turquoise">
                    VSTOUPIT DO KODEXU
                  </Button>
                </div>

                {/* Stories Card */}
                <div className="group relative p-12 border border-secondary/20 bg-black/60 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[80px] group-hover:bg-secondary/20 transition-all" />
                  <h3 className="text-2xl font-orbitron tracking-widest mb-6 text-secondary">ΠTHIꓥ – PŘÍBĚHY</h3>
                  <p className="text-muted-foreground font-orbitron text-sm leading-relaxed mb-8">
                    Autorské povídky a novely z první linie. První kontakt s ΠΘI entitami sloužící jako případové studie
                    pro Kodex. Inspirace klasikami jako Ikarie XB 1.
                  </p>
                  <Button className="w-full bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-black font-orbitron tracking-widest transition-all glow-turquoise">
                    ČÍST ΠTHIꓥ
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Manifest / Torture / Community */}
          <section className="py-32 container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div className="space-y-4">
                <h4 className="text-lg font-orbitron tracking-widest text-primary">Manifest</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-orbitron">
                  Rigorózní spekulace a kritické myšlení aplikované na české sci-fi dědictví. Tvoříme, abychom
                  pochopili.
                </p>
                <Link
                  href="#"
                  className="inline-block text-xs font-orbitron text-primary hover:underline tracking-widest uppercase pt-2"
                >
                  Číst manifest →
                </Link>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-orbitron tracking-widest text-secondary">Torture Test</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-orbitron">
                  Vědecká metoda v akci. Mučíme nápady otázkami, hosté z oborů a hledání bodu zlomu každé teorie.
                </p>
                <Link
                  href="#"
                  className="inline-block text-xs font-orbitron text-secondary hover:underline tracking-widest uppercase pt-2"
                >
                  Zobrazit epizody →
                </Link>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-orbitron tracking-widest text-primary">Komunita</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-orbitron">
                  Universum tvořené společně. Worldbuilding seance na Discordu pro všechny zvědavé mysli.
                </p>
                <Link
                  href="#"
                  className="inline-block text-xs font-orbitron text-primary hover:underline tracking-widest uppercase pt-2"
                >
                  Připojit se na Discord →
                </Link>
              </div>
            </div>
          </section>

          {/* About & Contact */}
          <section id="o-projektu" className="py-32 border-t border-white/5 bg-black/40">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div className="space-y-8">
                  <h2 className="text-3xl font-orbitron tracking-widest text-primary">O PROJEKTU</h2>
                  <div className="space-y-6 text-muted-foreground leading-relaxed font-orbitron text-sm">
                    <p>
                      Surreal Infinity je nezávislý český projekt pod vedením **JACOBA SURREALA**, stírající hranice
                      mezi vědou, filosofií, fikcí a komunitní tvorbou.
                    </p>
                    <p>
                      Navazujeme na silnou tradici české spekulativní fikce a filmového umění, ale posouváme ji do éry
                      interaktivního worldbuildingu, kde je lore budován s téměř inženýrskou přesností.
                    </p>
                  </div>
                  <div className="pt-8">
                    <img
                      src="/images/jacob-20surreal.png"
                      alt="Jacob Surreal"
                      className="h-12 opacity-50 hover:opacity-100 transition-opacity grayscale"
                    />
                  </div>
                </div>

                <div id="kontakt" className="space-y-8">
                  <h2 className="text-3xl font-orbitron tracking-widest text-secondary">KONTAKT</h2>
                  <p className="text-sm text-muted-foreground font-orbitron tracking-widest">
                    Chceš se zapojit, být hostem, nebo máš nápad na epizodu?
                  </p>
                  <form className="space-y-4">
                    <Input
                      placeholder="Jméno"
                      className="bg-black/40 border-white/10 focus:border-secondary h-12 font-orbitron"
                    />
                    <Input
                      placeholder="E-mail"
                      type="email"
                      className="bg-black/40 border-white/10 focus:border-secondary h-12 font-orbitron"
                    />
                    <Textarea
                      placeholder="Váš signál..."
                      className="bg-black/40 border-white/10 focus:border-secondary min-h-[120px] font-orbitron"
                    />
                    <Button className="w-full bg-secondary text-black font-orbitron tracking-widest h-12 hover:bg-secondary/80 glow-turquoise group">
                      ODESLAT SIGNÁL
                      <Send
                        size={16}
                        className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 bg-black relative z-10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <img src="https://blob.v0.app/infinity-icon.png" alt="Infinity" className="h-5 w-5 text-primary" />
                <span className="font-orbitron tracking-[0.3em] text-xs">SURREAL INFINITY</span>
              </Link>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-orbitron">
                © {new Date().getFullYear()} – ECLIPSEpunk Codex v2.0
              </span>
            </div>

            <div className="flex gap-8 text-[10px] font-orbitron tracking-widest uppercase text-muted-foreground">
              <Link href="#" className="hover:text-primary">
                Zásady soukromí
              </Link>
              <Link href="#" className="hover:text-primary">
                Podmínky použití
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://blob.v0.app/discord-icon.png" alt="Discord" className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://blob.v0.app/twitter-icon.png" alt="Twitter" className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <img src="https://blob.v0.app/youtube-icon.png" alt="Youtube" className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}
