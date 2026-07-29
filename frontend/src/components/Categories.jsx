import { Code2, Megaphone, ChartColumn, Pencil, Headphones } from "lucide-react";

function Categories() {

    const categories = [

        {
            icon: Code2,
            color: "#EEF4FF",
            iconColor: "#2563EB",
            title: "IT & Software",
            jobs: "18,672 Jobs",
        },

        {
            icon: Megaphone,
            color: "#F4ECFF",
            iconColor: "#7C3AED",
            title: "Marketing",
            jobs: "8,421 Jobs",
        },

        {
            icon: ChartColumn,
            color: "#ECFFF3",
            iconColor: "#16A34A",
            title: "Finance",
            jobs: "6,309 Jobs",
        },

        {
            icon: Pencil,
            color: "#FFF1F1",
            iconColor: "#EF4444",
            title: "Design",
            jobs: "4,738 Jobs",
        },

        {
            icon: Headphones,
            color: "#FFF8EA",
            iconColor: "#F59E0B",
            title: "Customer Service",
            jobs: "3,829 Jobs",
        },

    ];

    return (

        <section className="categories">
            <div className="container">
                <h2 className="section-title">
                    Top Categories
                </h2>

                <div className="categories-grid">

                    {
                        categories.map((category, index) => {
                            const Icon = category.icon;

                            return (

                                <div key={index} className="category-card">

                                    <div className="category-icon"
                                        style={{ background: category.color }}
                                    >
                                        <Icon size={30} color={category.iconColor}/>
                                    </div>

                                    <div className="category-info">

                                        <h3>{category.title}</h3>
                                        <p>{category.jobs}</p>

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>
            </div>
        </section>

    );

}

export default Categories;