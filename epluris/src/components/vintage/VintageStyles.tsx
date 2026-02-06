"use client";

export default function VintageStyles() {
  return (
    <style jsx global>{`
      :root { --vintage-red: #9d1b1b; --vintage-blue: #0a2463; --vintage-cream: #f8f3e9; --vintage-gold: #b8860b; --vintage-brown: #5d4037; --vintage-paper: #fffef7; --vintage-ink: #2c1810; }
      * { margin:0; padding:0; box-sizing:border-box; }
      body, .vintage-root { background-color: var(--vintage-cream); color:var(--vintage-ink); font-family: 'Crimson Text', serif; line-height:1.6; }
      /* simplified: include main styles only to keep file concise */
      .lettering-header { background-color: var(--vintage-paper); border: 2px solid var(--vintage-brown); border-radius:2px; padding:25px 30px; margin-bottom:30px; box-shadow: 0 4px 8px rgba(93,64,55,0.1), inset 0 1px 0 rgba(255,255,255,0.8); }
      .main-logo { font-family: 'IM Fell English', serif; font-size: 3.2rem; color: var(--vintage-red); text-shadow: 1px 1px 0 var(--vintage-brown); letter-spacing:4px; }
      .logo-subtitle { font-family: 'Libre Baskerville', serif; font-size:0.9rem; color:var(--vintage-brown); text-transform:uppercase; letter-spacing:5px; margin-top:5px; }
      .lettering-nav { display:flex; gap:15px; }
      .nav-letter { font-family: 'Special Elite', monospace; font-size:1.4rem; color:var(--vintage-blue); text-decoration:none; padding:8px 12px; border-bottom:2px solid var(--vintage-red); background: linear-gradient(to bottom, transparent 50%, rgba(10,36,99,0.05) 50%); }
      .dashboard-container { background-color:var(--vintage-paper); border:2px solid var(--vintage-brown); padding:30px; border-radius:2px; }
      .dashboard-title { font-family: 'IM Fell English', serif; font-size:2.2rem; color:var(--vintage-blue); text-align:center; margin-bottom:25px; }
      .lettering-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(320px,1fr)); gap:25px; }
      .guide-widget { background:var(--vintage-paper); border:2px solid var(--vintage-brown); padding:20px; min-height:280px; }
      .widget-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
      .widget-letter { font-family:'IM Fell English', serif; font-size:2.5rem; color:var(--vintage-red); width:50px; height:50px; display:flex; align-items:center; justify-content:center; border:2px solid var(--vintage-blue); }
      .widget-title { font-family:'Old Standard TT', serif; font-size:1.4rem; color:var(--vintage-blue); text-transform:uppercase; }
      .guide-meter { height:22px; background:var(--vintage-cream); border:1px solid var(--vintage-brown); margin:15px 0; position:relative; overflow:hidden; }
      .meter-fill { height:100%; background: linear-gradient(90deg, var(--vintage-red), var(--vintage-blue)); width:0%; transition: width 1s ease; }
      .meter-label { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:'Special Elite', monospace; }
      .lettering-footer { background-color:var(--vintage-paper); border-top:3px double var(--vintage-brown); padding:25px; text-align:center; }
    `}</style>
  );
}
