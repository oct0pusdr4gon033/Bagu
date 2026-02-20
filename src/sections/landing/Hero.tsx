import { useNavigate } from "react-router-dom";

export function Hero() {

    const navigate = useNavigate();
    return (
        <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-soft-gray">
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEWrMC4MiBMj20pfZBzoUAMvssCEj3rGbc4H1R_VFB3MmESLGXtV_ERBGgPETG_8--9XWPTHWlr6aw9BXYhVdZHkPQtTWD5el-GB3mq6C0gT0urg6g7Sx-n1T8viNhlnxi0Gdi0lvB7xIHf1TQj-vi651oGcTDCInQbHLTZehH6CafQ8gVqxUYgyeOweaoLAgxcvbGIyONkiOpMUxwpZ1oOI-w8WzchLpbAGpk_tvi9yh3N4wjg5KodJCIKPohbgNue8aIs6GtlBI')"
                    }}>
                </div>
                {/* Ensure index.css has .hero-gradient defined */}
                <div className="absolute inset-0 hero-gradient"></div>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-12 w-full">
                <div className="max-w-2xl flex flex-col items-start gap-8">
                    <span className="text-accent-gold font-bold text-xs uppercase tracking-[0.3em]">Excelencia en Cuero</span>
                    <h2 className="text-5xl lg:text-7xl font-serif font-light leading-tight text-primary-wine">
                        El Arte de la <br /> <span className="italic">Distinción</span> <br /> Permanente
                    </h2>

                    <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg">
                        Carteras, bolsos, morrales, billeteras y maletines de cuero de alta calidad cosidos a mano y elaborados para quienes valoran la herencia y el detalle.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button onClick={() => navigate("/collections")}
                            className="bg-primary-wine text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all duration-500 border border-primary-wine hover:border-black">
                            Ver Productos
                        </button>
                        <button onClick={() => navigate("/about")}
                            className="border border-accent-gold text-accent-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent-gold hover:text-white transition-all duration-500">
                            Nuestra Historia
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}