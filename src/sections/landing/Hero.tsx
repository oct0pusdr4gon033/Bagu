import { useNavigate } from "react-router-dom";

export function Hero() {

    const navigate = useNavigate();
    return (


        <section className="relative min-h-[650px] flex items-center justify-center text-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEWrMC4MiBMj20pfZBzoUAMvssCEj3rGbc4H1R_VFB3MmESLGXtV_ERBGgPETG_8--9XWPTHWlr6aw9BXYhVdZHkPQtTWD5el-GB3mq6C0gT0urg6g7Sx-n1T8viNhlnxi0Gdi0lvB7xIHf1TQj-vi651oGcTDCInQbHLTZehH6CafQ8gVqxUYgyeOweaoLAgxcvbGIyONkiOpMUxwpZ1oOI-w8WzchLpbAGpk_tvi9yh3N4wjg5KodJCIKPohbgNue8aIs6GtlBI')",
                }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 max-w-3xl px-6">
                <h2 className="font-serif text-5xl lg:text-7xl leading-tight">
                    El arte de la <br />
                    <span className="italic text-accent-gold">Distinción</span>
                </h2>

                <p className="mt-6 text-white/80 text-lg">
                    Carteras, bolsos, morrales, billeteras y maletines de cuero de alta calidad cosidos a mano y elaborados para quienes valoran la
                    herencia, el detalle y la permanencia.
                </p>

                <button onClick={() => navigate("/collections")}
                    className="mt-10 px-8 py-3 bg-primary hover:bg-[#5a242b] transition-all uppercase tracking-widest text-sm font-bold">
                    Ver Productos
                </button>
            </div>
        </section>

    );
}