<?php
function calculateAge($birthDate) {
    $currentDate = new DateTime();
    $birthDateTime = new DateTime($birthDate);
    $interval = $currentDate->diff($birthDateTime);
    
    return [
        'years' => $interval->y,
        'months' => $interval->m,
        'days' => $interval->d,
        'total_days' => $interval->days
    ];
}

$age = null;
$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['birthdate'])) {
    $birthdate = $_POST['birthdate'];
    if (strtotime($birthdate) > time()) {
        $error = "Birthday can't be in the future!";
    } else {
        $age = calculateAge($birthdate);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fun Age Calculator</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="calculator-wrapper">
            <div class="character doraemon"></div>
            <div class="character bheem"></div>
            
            <div class="calculator-box">
                <h1>Magical Age Calculator</h1>
                <form method="POST" class="age-form">
                    <div class="input-group">
                        <label for="birthdate">When were you born?</label>
                        <input type="date" id="birthdate" name="birthdate" required 
                               value="<?php echo isset($_POST['birthdate']) ? $_POST['birthdate'] : ''; ?>">
                    </div>
                    <button type="submit" class="calculate-btn">
                        Calculate My Age!
                    </button>
                </form>

                <?php if ($error): ?>
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>

                <?php if ($age): ?>
                    <div class="result-container">
                        <div class="age-card years">
                            <div class="number"><?php echo $age['years']; ?></div>
                            <div class="label">Years</div>
                        </div>
                        <div class="age-card months">
                            <div class="number"><?php echo $age['months']; ?></div>
                            <div class="label">Months</div>
                        </div>
                        <div class="age-card days">
                            <div class="number"><?php echo $age['days']; ?></div>
                            <div class="label">Days</div>
                        </div>
                    </div>
                    
                    <div class="fun-facts">
                        <h3>Fun Facts!</h3>
                        <p>You've lived for approximately:</p>
                        <ul>
                            <li><span class="fact-number"><?php echo number_format($age['total_days']); ?></span> days</li>
                            <li><span class="fact-number"><?php echo number_format($age['total_days'] * 24); ?></span> hours</li>
                            <li><span class="fact-number"><?php echo number_format($age['total_days'] * 1440); ?></span> minutes</li>
                        </ul>
                    </div>

                    <div class="live-time-counter">
                        <h3>⏱️ Your Time Journey ⏱️</h3>
                        <div class="time-sections">
                            <!-- Years and Months Section -->
                            <div class="time-section major-units">
                                <div class="time-unit years">
                                    <div class="time-value" id="live-years">00</div>
                                    <div class="time-label">Years</div>
                                </div>
                                <div class="time-unit months">
                                    <div class="time-value" id="live-months">00</div>
                                    <div class="time-label">Months</div>
                                </div>
                            </div>

                            <!-- Days and Hours Section -->
                            <div class="time-section medium-units">
                                <div class="time-unit days">
                                    <div class="time-value" id="live-days">00</div>
                                    <div class="time-label">Days</div>
                                </div>
                                <div class="time-unit hours">
                                    <div class="time-value" id="live-hours">00</div>
                                    <div class="time-label">Hours</div>
                                </div>
                            </div>

                            <!-- Live Counter Section -->
                            <div class="time-section live-units">
                                <div class="digital-display">
                                    <div class="time-unit minutes">
                                        <div class="time-value" id="live-minutes">00</div>
                                        <div class="time-label">Minutes</div>
                                    </div>
                                    <div class="time-separator">:</div>
                                    <div class="time-unit seconds">
                                        <div class="time-value" id="live-seconds">00</div>
                                        <div class="time-label">Seconds</div>
                                    </div>
                                    <div class="time-separator">:</div>
                                    <div class="time-unit milliseconds">
                                        <div class="time-value" id="live-milliseconds">000</div>
                                        <div class="time-label">MS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <script src="assets/js/script.js"></script>
</body>
</html>
