// Hand-drawn Data Scientist Portfolio - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create rough.js canvas for hand-drawn effects
    const roughCanvas = () => {
        const rc = rough.canvas(document.createElement('canvas'));
        return rc;
    };

    // Hero Section Animation
    const animateHero = () => {
        const heroSketch = document.getElementById('hero-sketch');
        if (!heroSketch) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = heroSketch.offsetWidth;
        canvas.height = heroSketch.offsetHeight;
        heroSketch.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const rc = rough.canvas(canvas);
        
        // Draw data visualization elements
        const drawChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw axes
            rc.line(50, 50, 50, canvas.height - 50, { roughness: 2, stroke: '#2d2d2d', strokeWidth: 2 });
            rc.line(50, canvas.height - 50, canvas.width - 50, canvas.height - 50, { roughness: 2, stroke: '#2d2d2d', strokeWidth: 2 });
            
            // Draw bar chart
            const barWidth = 40;
            const barGap = 30;
            const barValues = [0.3, 0.5, 0.7, 0.4, 0.8, 0.6];
            const maxBarHeight = canvas.height - 150;
            
            barValues.forEach((value, index) => {
                const x = 80 + (barWidth + barGap) * index;
                const barHeight = value * maxBarHeight;
                const y = canvas.height - 50 - barHeight;
                
                rc.rectangle(x, y, barWidth, barHeight, {
                    fill: index % 2 === 0 ? '#4a6fa5' : '#e57373',
                    fillStyle: 'solid',
                    roughness: 2,
                    stroke: '#2d2d2d',
                    strokeWidth: 1
                });
                
                // Add label
                ctx.font = "16px 'Indie Flower'";
                ctx.fillStyle = '#2d2d2d';
                ctx.textAlign = 'center';
                ctx.fillText(`D${index+1}`, x + barWidth/2, canvas.height - 25);
            });
            
            // Draw scatter points
            const scatterPoints = [
                {x: 0.2, y: 0.3}, {x: 0.3, y: 0.5}, {x: 0.4, y: 0.2},
                {x: 0.5, y: 0.6}, {x: 0.6, y: 0.4}, {x: 0.7, y: 0.7},
                {x: 0.8, y: 0.5}
            ];
            
            // Draw line connecting points
            ctx.beginPath();
            ctx.moveTo(
                50 + scatterPoints[0].x * (canvas.width - 100),
                50 + (1 - scatterPoints[0].y) * (canvas.height - 100)
            );
            
            for (let i = 1; i < scatterPoints.length; i++) {
                const x = 50 + scatterPoints[i].x * (canvas.width - 100);
                const y = 50 + (1 - scatterPoints[i].y) * (canvas.height - 100);
                ctx.lineTo(x, y);
            }
            
            ctx.strokeStyle = '#81c784';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw points
            scatterPoints.forEach(point => {
                const x = 50 + point.x * (canvas.width - 100);
                const y = 50 + (1 - point.y) * (canvas.height - 100);
                
                rc.circle(x, y, 10, {
                    fill: '#81c784',
                    fillStyle: 'solid',
                    roughness: 2,
                    stroke: '#2d2d2d',
                    strokeWidth: 1
                });
            });
            
            // Draw hand-drawn annotations
            rc.path(`M${canvas.width - 150},80 C${canvas.width - 120},60 ${canvas.width - 100},90 ${canvas.width - 70},70`, {
                roughness: 2.5,
                stroke: '#e57373',
                strokeWidth: 2
            });
            
            rc.path(`M${canvas.width - 200},120 C${canvas.width - 180},100 ${canvas.width - 160},130 ${canvas.width - 140},110`, {
                roughness: 2.5,
                stroke: '#4a6fa5',
                strokeWidth: 2
            });
        };
        
        // Initial draw
        drawChart();
        
        // Animate with GSAP
        gsap.from(heroSketch, {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power3.out"
        });
    };
    
    // Skills Chart Animation
    const animateSkillsChart = () => {
        const skillsChart = document.getElementById('skills-chart');
        if (!skillsChart) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = skillsChart.offsetWidth || 600;
        canvas.height = skillsChart.offsetHeight || 400;
        skillsChart.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const rc = rough.canvas(canvas);
        
        // Get all skills
        const skillItems = document.querySelectorAll('.skill-item');
        const skills = Array.from(skillItems).map(item => ({
            name: item.getAttribute('data-skill'),
            value: Math.random() * 0.5 + 0.5 // Random value between 0.5 and 1
        }));
        
        // Draw radar chart
        const drawRadarChart = (progress = 1) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) - 50;
            
            // Draw circles
            for (let i = 1; i <= 4; i++) {
                const circleRadius = radius * i / 4;
                rc.circle(centerX, centerY, circleRadius * 2, {
                    stroke: '#2d2d2d',
                    strokeWidth: 1,
                    roughness: 1.5,
                    fill: 'none'
                });
            }
            
            // Group skills by category
            const categories = {};
            skillItems.forEach(item => {
                const category = item.parentElement.parentElement.querySelector('h3').textContent;
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push({
                    name: item.getAttribute('data-skill'),
                    value: Math.random() * 0.5 + 0.5
                });
            });
            
            // Draw axes and data points for each category
            const categoryColors = {
                'Data Analysis': '#4a6fa5',
                'Machine Learning': '#e57373',
                'Visualization': '#81c784',
                'Big Data': '#ffb74d'
            };
            
            Object.entries(categories).forEach(([category, skills], categoryIndex) => {
                const color = categoryColors[category] || '#4a6fa5';
                const points = [];
                
                skills.forEach((skill, skillIndex) => {
                    const angle = (Math.PI * 2 * (skillIndex + categoryIndex * skills.length)) / (Object.keys(categories).length * skills.length);
                    const x = centerX + Math.cos(angle) * radius * skill.value * progress;
                    const y = centerY + Math.sin(angle) * radius * skill.value * progress;
                    
                    // Draw axis
                    rc.line(centerX, centerY, centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, {
                        stroke: '#2d2d2d',
                        strokeWidth: 1,
                        roughness: 1.5
                    });
                    
                    // Draw point
                    rc.circle(x, y, 8, {
                        fill: color,
                        fillStyle: 'solid',
                        stroke: '#2d2d2d',
                        strokeWidth: 1,
                        roughness: 1.5
                    });
                    
                    // Add label
                    ctx.font = "14px 'Indie Flower'";
                    ctx.fillStyle = '#2d2d2d';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const labelX = centerX + Math.cos(angle) * (radius + 20);
                    const labelY = centerY + Math.sin(angle) * (radius + 20);
                    ctx.fillText(skill.name, labelX, labelY);
                    
                    points.push({x, y});
                });
                
                // Connect points
                if (points.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(points[0].x, points[0].y);
                    
                    for (let i = 1; i < points.length; i++) {
                        ctx.lineTo(points[i].x, points[i].y);
                    }
                    
                    ctx.lineTo(points[0].x, points[0].y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    ctx.fillStyle = color;
                    ctx.globalAlpha = 0.2;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });
        };
        
        // Animate with ScrollTrigger
        ScrollTrigger.create({
            trigger: '#skills',
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(skillsChart, 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );
                
                gsap.fromTo({ progress: 0 },
                    { progress: 0 },
                    {
                        progress: 1,
                        duration: 1.5,
                        ease: "power2.out",
                        onUpdate: function() {
                            drawRadarChart(this.targets()[0].progress);
                        }
                    }
                );
            },
            once: true
        });
        
        // Initial draw
        drawRadarChart(0);
    };
    
    // Project Cards Animation
    const animateProjectCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) return;
        
        projectCards.forEach((card, index) => {
            const sketch = card.querySelector('.project-sketch');
            if (!sketch) return;
            
            const canvas = document.createElement('canvas');
            canvas.width = sketch.offsetWidth || 300;
            canvas.height = sketch.offsetHeight || 200;
            sketch.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            const rc = rough.canvas(canvas);
            
            // Different sketch for each project
            const drawProjectSketch = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                switch(index % 4) {
                    case 0: // Dashboard
                        // Draw dashboard layout
                        rc.rectangle(20, 20, canvas.width - 40, canvas.height - 40, {
                            fill: '#f9f6f0',
                            stroke: '#2d2d2d',
                            strokeWidth: 2,
                            roughness: 2
                        });
                        
                        // Draw charts
                        rc.rectangle(30, 30, 100, 60, {
                            fill: '#4a6fa5',
                            fillStyle: 'solid',
                            stroke: '#2d2d2d',
                            roughness: 1.5
                        });
                        
                        rc.circle(canvas.width - 80, 60, 50, {
                            fill: '#e57373',
                            fillStyle: 'solid',
                            stroke: '#2d2d2d',
                            roughness: 1.5
                        });
                        
                        // Draw line chart
                        const points = [
                            {x: 30, y: canvas.height - 60},
                            {x: 60, y: canvas.height - 90},
                            {x: 90, y: canvas.height - 70},
                            {x: 120, y: canvas.height - 100},
                            {x: 150, y: canvas.height - 80},
                            {x: 180, y: canvas.height - 110}
                        ];
                        
                        ctx.beginPath();
                        ctx.moveTo(points[0].x, points[0].y);
                        for (let i = 1; i < points.length; i++) {
                            ctx.lineTo(points[i].x, points[i].y);
                        }
                        ctx.strokeStyle = '#81c784';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        points.forEach(point => {
                            rc.circle(point.x, point.y, 5, {
                                fill: '#81c784',
                                fillStyle: 'solid',
                                stroke: '#2d2d2d',
                                roughness: 1
                            });
                        });
                        break;
                        
                    case 1: // NLP
                        // Draw text document
                        rc.rectangle(20, 20, canvas.width - 40, canvas.height - 40, {
                            fill: '#f9f6f0',
                            stroke: '#2d2d2d',
                            strokeWidth: 2,
                            roughness: 2
                        });
                        
                        // Draw text lines
                        for (let i = 0; i < 5; i++) {
                            const y = 40 + i * 20;
                            const width = Math.random() * 100 + 100;
                            rc.line(40, y, 40 + width, y, {
                                stroke: '#2d2d2d',
                                strokeWidth: 1,
                                roughness: 2
                            });
                        }
                        
                        // Draw sentiment analysis visualization
                        const sentimentX = canvas.width - 100;
                        const sentimentY = 60;
                        rc.circle(sentimentX, sentimentY, 40, {
                            fill: '#e57373',
                            fillStyle: 'solid',
                            stroke: '#2d2d2d',
                            roughness: 1.5
                        });
                        
                        // Draw connecting lines
                        for (let i = 0; i < 3; i++) {
                            const startX = 150 + i * 20;
                            const startY = 50 + i * 15;
                            rc.line(startX, startY, sentimentX - 30, sentimentY, {
                                stroke: '#4a6fa5',
                                strokeWidth: 1,
                                roughness: 2
                            });
                        }
                        break;
                        
                    case 2: // Time Series
                        // Draw graph paper background
                        rc.rectangle(20, 20, canvas.width - 40, canvas.height - 40, {
                            fill: '#f9f6f0',
                            stroke: '#2d2d2d',
                            strokeWidth: 2,
                            roughness: 2
                        });
                        
                        // Draw grid lines
                        for (let i = 0; i < 5; i++) {
                            const y = 40 + i * 30;
                            rc.line(40, y, canvas.width - 40, y, {
                                stroke: '#2d2d2d',
                                strokeWidth: 0.5,
                                roughness: 1,
                                strokeLineDash: [3, 3]
                            });
                        }
                        
                        // Draw time series line
                        const timePoints = [];
                        for (let i = 0; i < 10; i++) {
                            const x = 40 + i * ((canvas.width - 80) / 9);
                            // Create a sine wave with some randomness
                            const y = 100 + Math.sin(i * 0.6) * 50 + (Math.random() * 10 - 5);
                            timePoints.push({x, y});
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(timePoints[0].x, timePoints[0].y);
                        for (let i = 1; i < timePoints.length; i++) {
                            ctx.lineTo(timePoints[i].x, timePoints[i].y);
                        }
                        ctx.strokeStyle = '#4a6fa5';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        // Draw forecast extension (dashed)
                        const forecastPoints = [];
                        for (let i = 0; i < 3; i++) {
                            const lastPoint = timePoints[timePoints.length - 1];
                            const x = lastPoint.x + (i + 1) * 20;
                            // Continue the pattern with more randomness
                            const y = lastPoint.y + (Math.random() * 30 - 15);
                            forecastPoints.push({x, y});
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(timePoints[timePoints.length - 1].x, timePoints[timePoints.length - 1].y);
                        for (let i = 0; i < forecastPoints.length; i++) {
                            ctx.lineTo(forecastPoints[i].x, forecastPoints[i].y);
                        }
                        ctx.setLineDash([5, 5]);
                        ctx.strokeStyle = '#e57373';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        ctx.setLineDash([]);
                        break;
                        
                    case 3: // Clustering
                        // Draw canvas background
                        rc.rectangle(20, 20, canvas.width - 40, canvas.height - 40, {
                            fill: '#f9f6f0',
                            stroke: '#2d2d2d',
                            strokeWidth: 2,
                            roughness: 2
                        });
                        
                        // Draw axes
                        rc.line(40, canvas.height - 40, canvas.width - 40, canvas.height - 40, {
                            stroke: '#2d2d2d',
                            strokeWidth: 1,
                            roughness: 1.5
                        });
                        
                        rc.line(40, 40, 40, canvas.height - 40, {
                            stroke: '#2d2d2d',
                            strokeWidth: 1,
                            roughness: 1.5
                        });
                        
                        // Draw clusters
                        const clusters = [
                            { x: 80, y: 80, color: '#4a6fa5', points: 5 },
                            { x: 180, y: 120, color: '#e57373', points: 7 },
                            { x: 100, y: 160, color: '#81c784', points: 6 }
                        ];
                        
                        clusters.forEach(cluster => {
                            // Draw cluster center
                            rc.circle(cluster.x, cluster.y, 10, {
                                fill: cluster.color,
                                fillStyle: 'solid',
                                stroke: '#2d2d2d',
                                strokeWidth: 1,
                                roughness: 1.5
                            });
                            
                            // Draw cluster points
                            for (let i = 0; i < cluster.points; i++) {
                                const angle = Math.random() * Math.PI * 2;
                                const distance = Math.random() * 30 + 15;
                                const x = cluster.x + Math.cos(angle) * distance;
                                const y = cluster.y + Math.sin(angle) * distance;
                                
                                rc.circle(x, y, 5, {
                                    fill: cluster.color,
                                    fillStyle: 'solid',
                                    stroke: '#2d2d2d',
                                    strokeWidth: 1,
                                    roughness: 1
                                });
                                
                                // Draw line to center
                                rc.line(cluster.x, cluster.y, x, y, {
                                    stroke: cluster.color,
                                    strokeWidth: 0.5,
                                    roughness: 1,
                                    strokeLineDash: [2, 2]
                                });
                            }
                        });
                        break;
                }
            };
            
            // Draw the sketch
            drawProjectSketch();
            
            // Animate with ScrollTrigger
            ScrollTrigger.create({
                trigger: card,
                start: 'top 80%',
                onEnter: () => {
                    gsap.fromTo(sketch, 
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" }
                    );
                },
                once: true
            });
        });
    };
    
    // Notebook Animation for About Section
    const animateNotebook = () => {
        const notebook = document.querySelector('.notebook-sketch');
        if (!notebook) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = notebook.offsetWidth || 400;
        canvas.height = notebook.offsetHeight || 300;
        notebook.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const rc = rough.canvas(canvas);
        
        // Draw notebook
        const drawNotebook = () => {
            // Draw notebook page
            rc.rectangle(20, 20, canvas.width - 40, canvas.height - 40, {
                fill: '#f9f6f0',
                stroke: '#2d2d2d',
                strokeWidth: 2,
                roughness: 2
            });
            
            // Draw spiral binding
            for (let i = 0; i < 10; i++) {
                const y = 40 + i * ((canvas.height - 80) / 9);
                rc.circle(20, y, 5, {
                    stroke: '#2d2d2d',
                    strokeWidth: 1,
                    roughness: 1,
                    fill: 'none'
                });
            }
            
            // Draw notebook lines
            for (let i = 0; i < 8; i++) {
                const y = 50 + i * 30;
                rc.line(40, y, canvas.width - 40, y, {
                    stroke: '#2d2d2d',
                    strokeWidth: 0.5,
                    roughness: 1,
                    strokeLineDash: [1, 1]
                });
            }
            
            // Draw data science doodles
            // Formula
            ctx.font = "16px 'Indie Flower'";
            ctx.fillStyle = '#2d2d2d';
            ctx.fillText("y = mx + b + ε", 60, 70);
            
            // Small chart
            rc.rectangle(60, 100, 100, 60, {
                stroke: '#2d2d2d',
                strokeWidth: 1,
                roughness: 1.5,
                fill: 'none'
            });
            
            const chartPoints = [
                {x: 70, y: 140},
                {x: 90, y: 120},
                {x: 110, y: 130},
                {x: 130, y: 110},
                {x: 150, y: 120}
            ];
            
            ctx.beginPath();
            ctx.moveTo(chartPoints[0].x, chartPoints[0].y);
            for (let i = 1; i < chartPoints.length; i++) {
                ctx.lineTo(chartPoints[i].x, chartPoints[i].y);
            }
            ctx.strokeStyle = '#4a6fa5';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Draw a small decision tree
            const treeX = canvas.width - 120;
            const treeY = 80;
            
            // Root node
            rc.circle(treeX, treeY, 15, {
                fill: '#e57373',
                fillStyle: 'solid',
                stroke: '#2d2d2d',
                strokeWidth: 1,
                roughness: 1.5
            });
            
            // Branches
            rc.line(treeX, treeY + 15, treeX - 30, treeY + 50, {
                stroke: '#2d2d2d',
                strokeWidth: 1,
                roughness: 1.5
            });
            
            rc.line(treeX, treeY + 15, treeX + 30, treeY + 50, {
                stroke: '#2d2d2d',
                strokeWidth: 1,
                roughness: 1.5
            });
            
            // Leaf nodes
            rc.circle(treeX - 30, treeY + 50, 12, {
                fill: '#81c784',
                fillStyle: 'solid',
                stroke: '#2d2d2d',
                strokeWidth: 1,
                roughness: 1.5
            });
            
            rc.circle(treeX + 30, treeY + 50, 12, {
                fill: '#4a6fa5',
                fillStyle: 'solid',
                stroke: '#2d2d2d',
                strokeWidth: 1,
                roughness: 1.5
            });
        };
        
        // Draw the notebook
        drawNotebook();
        
        // Animate with ScrollTrigger
        ScrollTrigger.create({
            trigger: '#about',
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(notebook, 
                    { opacity: 0, rotationY: -20 },
                    { opacity: 1, rotationY: 0, duration: 1.2, ease: "power2.out" }
                );
            },
            once: true
        });
    };
    
    // Contact Form Animation
    const animateContactForm = () => {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        // Animate form elements
        const formElements = form.querySelectorAll('.form-group, button');
        
        gsap.from(formElements, {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                once: true
            }
        });
        
        // Add hand-drawn effect to form inputs on focus
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '2px 2px 0 var(--accent-color)';
                input.style.transform = 'rotate(-0.5deg)';
            });
            
            input.addEventListener('blur', () => {
                input.style.boxShadow = 'none';
                input.style.transform = 'none';
            });
        });
    };
    
    // Initialize all animations
    animateHero();
    animateSkillsChart();
    animateProjectCards();
    animateNotebook();
    animateContactForm();
    
    // Add scroll animations for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                once: true
            }
        });
    });
    
    // Add hand-drawn hover effects to project cards
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'rotate(-1deg) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'none';
        });
    });
});
